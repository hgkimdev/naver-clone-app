import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
});

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{ uri: "https://m.naver.com" }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onShouldStartLoadWithRequest={(request) => {
          console.log("Home - request", request);

          if (
            request.url.startsWith("http://m.naver.com") ||
            request.mainDocumentURL?.startsWith("http://m.naver.com")
          ) {
            return true;
          }

          if (request.url != null && request.url.startsWith("https://")) {
            router.navigate({
              pathname: "browser",
              params: { initialURL: request.url },
            });
            return false;
          }
          return true;
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
