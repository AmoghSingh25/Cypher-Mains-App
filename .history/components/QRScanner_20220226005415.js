import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  NavigationContainer,
  CommonActions,
  useNavigation,
} from "@react-navigation/native";
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
export default function QRScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null); //for checking the cam permission
  const [scanned, setScanned] = useState(false); //for checking if the QR code is scanned or not
  const [text, setText] = useState("Not yet scanned"); //setting the scanned QR link

  const askForCameraPermission = () => {
    //asking camera permission takes place here
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    //Requesting for Camera Permission
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    // What happens after we read the bar code
    setScanned(true);
    setText(data);
  };

  if (hasPermission === null) {
    // Check permissions and return the screens
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    //if permission for the camera is not given then it will show a btn for asking the permission again
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  function deriveInfo(text) {
    var splitQR = text.split("&");
    var len = splitQR.length;

    var result = [];
    var details = [];

    for (var i = 0; i < len; i++) {
      result[i] = splitQR[i].split("=");
      details[i] = result[i][1];
    }
    const navigation = useNavigation();
    let object = MMKV.getMap("OTP");

    navigation.navigate("CYPHER MAINS");
  }

  // main camera view point
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
        <TouchableOpacity onPress={() => navigation.navigate("CYPHER MAINS")}>
          <Text>Test</Text>
        </TouchableOpacity>
      </View>
      {/* displays the scaanned url */}
      <Text style={styles.maintext}>{text}</Text>

      {scanned && deriveInfo(text)}
      {/* decoding the qr code */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "red",
  },
});
