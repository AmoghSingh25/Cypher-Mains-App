import { StatusBar } from "expo-status-bar";
import AuthenticateBTN from "./components/Authenticate.js";

const Stack = createNativeStackNavigator();
function MyStack() {
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

export default function App() {
  return (
    <>
      <MyStack />
      <AuthenticateBTN />

      <StatusBar hidden={false} />
    </>
  );
}
