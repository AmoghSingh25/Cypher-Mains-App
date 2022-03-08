import React, { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  LogBox,
  ScrollView,
  useColorScheme,
  TouchableHighlight,
} from "react-native";
import {
  BodyView,
  BodyTitle,
  BodyBox,
  FlexRow,
  colors,
} from "../styles/appStyles";
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import * as OTPAuth from "otpauth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import QRScanner from "./QRScanner";
import Loading from "./LinearProgression";
import { ScreenHeight } from "react-native-elements/dist/helpers";
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["VirtualizedLists", "Warning:..."]);
LogBox.ignoreAllLogs();
const MMKV = new MMKVStorage.Loader().withEncryption().initialize();
export default function AuthenticateBTN() {
  const [number, updateNumber] = useState(0);
  const isDarkMode = useColorScheme() === "dark";
  function QRCodeScanner() {
    return <QRScanner />;
  }
  function deleteOTP(index) {
    let obj = generateOTP();
    obj.splice(index, 1);
    console.log(obj);
    MMKV.setMap("OTP", obj, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
    });
    updateNumber(number + 1);
  }

  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
  }

  function calcOTP(key) {
    let totp = new OTPAuth.TOTP({
      issuer: "ACME",
      label: "AzureDiamond",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: key, // or "OTPAuth.Secret.fromBase32('NB2W45DFOIZA')"
    });
    // Generate a token.
    let token = totp.generate();
    return token;
  }

  function generateOTP() {
    key = "EQPWK6IVGRRXCTZE";
    let codes = [
      {
        key: key,
        org: "Github",
      },
      {
        key: key,

        org: "Heroku",
      },
      {
        key: key,

        org: "Yahoo4",
      },
      {
        key: key,

        org: "Yahoo1",
      },
      {
        key: key,

        org: "Yahoo2",
      },
      {
        key: key,

        org: "Yahoo3",
      },
    ];
    // MMKV.setMap("OTP", codes, (error, result) => {
    //   if (error) {
    //     console.log(error);
    //     return;
    //   }
    // });
    let object = MMKV.getMap("OTP");

    //MMKV.removeItem("OTP");
    return object;
  }

  function Home({ navigation }) {
    const forceUpdate = useForceUpdate();
    return (
      <>
        <ScrollView
          style={{ backgroundColor: isDarkMode ? "#1F1C1B" : "#bffff0" }}
        >
          <View style={{ backgroundColor: isDarkMode ? "#1F1C1B" : "#bffff0" }}>
            <BodyView>
              {generateOTP().map((element, index) => {
                return (
                  <BodyBox key={index} style={styles.viewcontiner}>
                    <FlexRow>
                      <BodyTitle
                        key={element.org}
                        style={{ color: !isDarkMode ? "#1F1C1B" : "#bffff0" }}
                      >
                        {element.org}
                      </BodyTitle>
                      <BodyTitle
                        key={element.otp}
                        style={{ color: !isDarkMode ? "#1F1C1B" : "#bffff0" }}
                      >
                        {calcOTP(element.key)}
                      </BodyTitle>
                      <TouchableOpacity onPress={() => deleteOTP(index)}>
                        <Icon name="delete" color={"#FFFFFF"} size={20} />
                      </TouchableOpacity>
                    </FlexRow>

                    <Loading updateFunc={forceUpdate} />
                  </BodyBox>
                );
              })}
            </BodyView>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.authenticateButton,
            {
              backgroundColor: !isDarkMode ? "#1f1c1b" : "#BFFFF0",
              color: !isDarkMode ? "#1f1c1b" : "#BFFFF0",
              zIndex: 2,
            },
          ]}
          onPress={() => navigation.navigate("Scan the QR Code")}
        >
          <Text
            style={[
              styles.authenticateButtonText,
              { color: isDarkMode ? "#1f1c1b" : "#BFFFF0" },
            ]}
          >
            AUTHENTICATE
          </Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CYPHER MAINS"
        screenOptions={{
          //header styling
          headerTitle: isDarkMode ? "#bffff0" : "#1f1c1b",
          headerTitleStyle: {
            fontWeight: "bold",
            fontFamily: "Roboto",
            color: isDarkMode ? "#bffff0" : "#1f1c1b",
          },
          headerStyle: {
            backgroundColor: isDarkMode ? "#1F1C1B" : "#bffff0",
          },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="CYPHER MAINS" component={Home} />
        <Stack.Screen name="Scan the QR Code" component={QRScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  viewcontiner: {},
  authenticateButton: {
    position: "absolute",
    alignSelf: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 10,
    width: 200,
    borderRadius: 10,
    bottom: 10,
  },
  authenticateButtonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
});
