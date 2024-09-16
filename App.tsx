import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Loadies from "./src/Loadies";

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor="#121010" />
        <Loadies isLoading={true} source={require("./src/assets/bg.png")} />
        <Loadies isLoading={true} source={require("./src/assets/bg2.png")} />
        <Loadies isLoading={true} source={require("./src/assets/bg3.png")} />
        <Loadies isLoading={true} source={require("./src/assets/bg4.png")} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121010",
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
});
