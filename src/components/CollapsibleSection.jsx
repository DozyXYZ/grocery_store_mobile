import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ThemeColors } from "../utils/ThemeColors";
import { useState } from "react";

export const CollapsibleSection = ({ title, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsVisible(!isVisible)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomColor: ThemeColors.fifth,
          borderBottomWidth: 2,
          marginBottom: 5,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: ThemeColors.primary,
            fontWeight: "600",
          }}
        >
          {title}
        </Text>

        <AntDesign
          name={isVisible ? "down" : "right"}
          size={24}
          color={ThemeColors.third}
        />
      </TouchableOpacity>
      {isVisible && <View style={{ marginTop: 10 }}>{children}</View>}
    </View>
  );
};
