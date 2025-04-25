import { View, TouchableOpacity } from "react-native";
import { ThemeColors } from "../utils/ThemeColors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export const NavFooter = ({ username }) => {
  const nav = useNavigation();
  const route = useRoute();

  const tabs = [
    { name: "Store", icon: "storefront-sharp" },
    { name: "Cart", icon: "cart-sharp" },
    { name: "Favorites", icon: "heart" },
    { name: "OrderHistory", icon: "person" },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: ThemeColors.secondary,
      }}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => nav.navigate(tab.name, { username })}
          style={{ alignItems: "center" }}
        >
          <Ionicons
            name={tab.icon}
            size={28}
            color={
              route.name === tab.name ? ThemeColors.primary : ThemeColors.third
            }
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
