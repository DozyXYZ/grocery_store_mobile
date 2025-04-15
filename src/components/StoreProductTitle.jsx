import { View, Text } from "react-native";
import { ThemeColors } from "../utils/ThemeColors";

export const StoreProductTitle = ({ title }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: ThemeColors.third,
        }}
      >
        {title}
      </Text>
    </View>
  );
};
