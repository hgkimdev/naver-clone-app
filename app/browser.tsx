import { useLocalSearchParams } from "expo-router";
import React, { useState, useMemo, useRef } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "black",
  },
  urlContainer: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  urlText: {
    color: "white",
  },
  loadingBarBackground: {
    height: 3,
    backgroundColor: "white",
  },
  loadingBar: {
    height: "100%",
    backgroundColor: "green",
  },
});

const BrowserScreen = () => {
  const params = useLocalSearchParams();
  const initialUrl = params.initialUrl as string;
  const [url, setUrl] = useState(initialUrl);
  const urlTitle = useMemo(
    () => url.replace("https://", "").split("/")[0],
    [url],
  );

  const progressAnimatedValue = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.urlContainer}>
        <Text style={styles.urlText}>{urlTitle}</Text>
      </View>
      <View style={styles.loadingBarBackground}>
        <Animated.View
          style={[
            styles.loadingBar,
            {
              width: progressAnimatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
      <WebView
        source={{ uri: initialUrl }}
        onNavigationStateChange={(event) => {
          setUrl(event.url);
        }}
        onLoadProgress={(event) => {
          console.log("onLoadProgress", event.nativeEvent.progress);
          progressAnimatedValue.setValue(event.nativeEvent.progress);
        }}
        onLoadEnd={() => {
          console.log("onLoadEnd");
          progressAnimatedValue.setValue(0);
        }}
      />
    </SafeAreaView>
  );
};

export default BrowserScreen;
