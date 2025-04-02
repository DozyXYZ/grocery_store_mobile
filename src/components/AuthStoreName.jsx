import React from "react";
import { Text, View } from "react-native";
import { ThemeColors } from "../utils/ThemeColors";

export const AuthStoreName = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 75,
          color: ThemeColors.primary,
          textAlign: "center",
        }}
      >
        Shiro
      </Text>

      <Text
        style={{
          fontSize: 20,
          color: ThemeColors.primary,
          textAlign: "center",
          letterSpacing: 5,
          top: -15,
        }}
      >
        Online Store
      </Text>
    </View>
  );
};
