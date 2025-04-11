import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { authentication } from "../../Firebase-Config";
import { signOut } from "firebase/auth";

export const NavHeader = ({ title }) => {
  const nav = useNavigation();
  const route = useRoute();

  const handleSignOut = async () => {
    try {
      await signOut(authentication);
      nav.navigate("Login");
    } catch (error) {
      Alert.alert("Error", "Failed to sign out. Please try again.");
      console.error("Sign out error:", error);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {route.name !== "Store" && (
        <Ionicons
          onPress={() => {
            nav.goBack();
          }}
          name="chevron-back"
          size={28}
          color="black"
        />
      )}

      <Text style={{ fontSize: 20, fontWeight: "600" }}>{title}</Text>

      <Ionicons onPress={handleSignOut} name="log-in-outline" size={28} />
    </View>
  );
};
