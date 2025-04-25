import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import { ThemeColors } from "../utils/ThemeColors";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const OrderConfirmation = () => {
  const nav = useNavigation();
  const route = useRoute();
  const { username } = route.params || {};

  useEffect(() => {
    setTimeout(() => {
      nav.navigate("OrderHistory", { username });
    }, 3000);
  }, []);

  return (
    <View
      style={{
        backgroundColor: ThemeColors.secondary,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar />

      <MaterialIcons name="verified" size={100} color={ThemeColors.primary} />

      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Order Placed Successfully
      </Text>
    </View>
  );
};

export default OrderConfirmation;
