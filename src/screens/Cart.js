import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "../utils/ThemeColors";
import { NavHeader } from "../components/NavHeader";
import { NavFooter } from "../components/NavFooter";
import { useRoute } from "@react-navigation/native";

const Cart = () => {
  const route = useRoute();
  const { userData } = route.params || {};
  console.log("User Data:", userData);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ThemeColors.secondary }}>
      <NavHeader title="Cart" />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: ThemeColors.primary, fontSize: 20 }}>
          Your Cart is empty! 😔
        </Text>
      </View>

      <NavFooter userData={userData} />
    </SafeAreaView>
  );
};

export default Cart;
