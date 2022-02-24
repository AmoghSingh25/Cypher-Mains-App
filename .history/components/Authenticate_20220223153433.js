import React, { useState } from "react";

import { Text, View, TouchableOpacity, StyleSheet, LogBox } from "react-native";
import {
  BodyView,
  BodyTitle,
  BodyBox,
  FlexRow,
  colors,
} from "../styles/appStyles";
import * as OTPAuth from "otpauth";
import { ScrollView, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import QRScanner from "./QRScanner";
import Loading from "./LinearProgression";
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["VirtualizedLists", "Warning:..."]);
LogBox.ignoreAllLogs();

export default function AuthenticateBTN() {
  const isDarkMode = useColorScheme() === "dark";
  function QRCodeScanner() {
    return <QRScanner />;
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
    console.log(token);
    return token;
  }

  function generateOTP() {
    key = "EQPWK6IVGRRXCTZE";
    let codes = [
      {
        otp: calcOTP(key),
        org: "Github",
      },
      {
        otp: calcOTP(key),
        org: "Heroku",
      },
      {
        otp: calcOTP(key),
        org: "Yahoo4",
      },
      {
        otp: calcOTP(key),
        org: "Yahoo1",
      },
      {
        otp: calcOTP(key),
        org: "Yahoo2",
      },
      {
        otp: calcOTP(key),
        org: "Yahoo3",
      },
    ];

    return codes;
  }

  function Home({ navigation }) {
    const forceUpdate = useForceUpdate();
    return (
      <>
        <ScrollView>
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
                        {element.otp}
                      </BodyTitle>
                    </FlexRow>

                    <Loading updateFunc={forceUpdate} />
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
          <Text
            style={[
              styles.authenticateButtonText,
              { color: isDarkMode ? colors.black : "#BFFFFF0" },
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
        <Stack.Screen name="Scan the QR Code" component={QRCodeScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  viewcontiner: {},
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
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
});
