import { TouchableOpacity, Text } from "react-native";
import { ThemeColors } from "../utils/ThemeColors";

export const GreenButton = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: ThemeColors.primary,
        marginTop: 30,
        height: 70,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <Text
        style={{
          fontSize: 19,
          color: ThemeColors.secondary,
          fontWeight: "500",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
