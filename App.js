import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import TrafficLightSystem from "./components/TrafficLightSystem";

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TrafficLightSystem />
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
