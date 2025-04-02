import { View, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeColors } from "../utils/ThemeColors";

export const AuthInputField = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  toggleSecureEntry,
  keyboardType = "default",
  maxLength,
  autoCapitalize = "none",
  icon,
}) => {
  return (
    <View style={{ marginTop: 40 }}>
      {/* Label */}
      <Text
        style={{
          color: ThemeColors.fourth,
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        {label}
      </Text>

      {/* Input Field */}
      <View
        style={{
          borderColor: ThemeColors.fifth,
          borderBottomWidth: 2,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          style={{
            fontSize: 17,
            marginTop: 15,
            flex: 0.9,
          }}
        />

        {/* Optional Icon */}
        {icon && (
          <Ionicons
            onPress={toggleSecureEntry}
            name={icon}
            size={24}
            color={ThemeColors.third}
          />
        )}
      </View>
    </View>
  );
};
