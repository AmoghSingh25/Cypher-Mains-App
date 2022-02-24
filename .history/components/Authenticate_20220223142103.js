import React from "react";

import { Text, View, TouchableOpacity, StyleSheet, LogBox } from "react-native";
import { BodyView, BodyTitle, BodyBox, FlexRow } from "../styles/appStyles";
import * as OTPAuth from "otpauth";
import { ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import QRScanner from "./QRScanner";
import Loading from "./LinearProgression";
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["VirtualizedLists", "Warning:..."]);
LogBox.ignoreAllLogs();

export default function AuthenticateBTN() {
  function QRCodeScanner() {
    return <QRScanner />;
  }

  function calcOTP() {
    let otp = Math.floor(100000 + Math.random() * 900000);
    let totp = new OTPAuth.TOTP({
      issuer: "ACME",
      label: "AzureDiamond",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: "NB2W45DFOIZA", // or "OTPAuth.Secret.fromBase32('NB2W45DFOIZA')"
    });

    // Generate a token.
    let token = totp.generate();
    console.log(token);
    return token;
  }

  function generateOTP() {
    let codes = [
      {
        otp: calcOTP(),
        org: "Github",
      },
      {
        otp: calcOTP(),
        org: "Heroku",
      },
      {
        otp: calcOTP(),
        org: "Yahoo4",
      },
      {
        otp: calcOTP(),
        org: "Yahoo1",
      },
      {
        otp: calcOTP(),
        org: "Yahoo2",
      },
      {
        otp: calcOTP(),
        org: "Yahoo3",
      },
    ];

    return codes;
  }

  function Home({ navigation }) {
    return (
      <>
        <ScrollView>
          <View style={styles.btnContainer}>
            <BodyView>
              {generateOTP().map((element, index) => {
                return (
                  <BodyBox key={index} style={styles.viewcontainer}>
                    <FlexRow>
                      <BodyTitle key={element.org}>{element.org}</BodyTitle>
                      <BodyTitle key={element.otp}>{element.otp}</BodyTitle>
                    </FlexRow>

                    <Loading />
                  </BodyBox>
                );
              })}
            </BodyView>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.authenticateButton}
          onPress={() => navigation.navigate("Scan the QR Code")}
        >
          <Text style={styles.authenticateButtonText}>AUTHENTICATE</Text>
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
          headerTitle: "black",
          headerTitleStyle: { fontWeight: "bold", fontFamily: "Roboto" },
          headerStyle: { backgroundColor: "#bffff0" },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="CYPHER MAINS" component={Home} />
        <Stack.Screen name="Scan the QR Code" component={QRCodeScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  viewcontainer: {},
  btnContainer: {
    backgroundColor: "#bffff0",
  },
  authenticateButton: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "black",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 10,
    width: 200,
    borderRadius: 10,
    bottom: 10,
  },
  authenticateButtonText: {
    color: "rgba(191, 255, 240, 1)",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
});
