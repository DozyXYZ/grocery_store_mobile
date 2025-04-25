import { Text } from "react-native";
import { ThemeColors } from "../utils/ThemeColors";

export const OrderHistoryCell = ({ value, style }) => {
  return (
    <Text
      style={{
        color: ThemeColors.third,
        fontSize: 16,
        flex: 1,
        textAlign: "right",
        ...style,
      }}
    >
      {value}
    </Text>
  );
};

export const OrderHistoryHeader = ({ title, style }) => {
  return (
    <Text
      style={{
        color: ThemeColors.fourth,
        fontSize: 18,
        flex: 1,
        textAlign: "right",
        ...style,
      }}
    >
      {title}
    </Text>
  );
};
