import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";

const BrowserScreen = () => {
  const params = useLocalSearchParams();
  return <Text>Browser</Text>;
};

export default BrowserScreen;
