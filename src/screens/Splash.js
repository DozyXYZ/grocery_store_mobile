import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { ThemeColors } from "../utils/ThemeColors";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

const Splash = () => {
  const nav = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      nav.replace("Login");
    }, 3000);
  }, []);

  return (
    <View
      style={{
        backgroundColor: ThemeColors.primary,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <StatusBar style="light" />
      <View>
        <Text
          style={{
            fontSize: 75,
            color: ThemeColors.secondary,
            textAlign: "center",
          }}
        >
          Shiro
        </Text>

        <Text
          style={{
            fontSize: 20,
            color: ThemeColors.secondary,
            textAlign: "center",
            letterSpacing: 5,
            top: -15,
          }}
        >
          Online Store
        </Text>
      </View>
    </View>
  );
};

export default Splash;
