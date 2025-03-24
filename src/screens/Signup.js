import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "../utils/ThemeColors";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = userCredentials;

  const handleChange = (name, value) => {
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const [eyeSecurity, setEyeSecurity] = useState(true);

  const toggleEye = () => {
    setEyeSecurity(!eyeSecurity);
  };

  const nav = useNavigation();

  const goLogin = () => {
    nav.navigate("Login");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: ThemeColors.secondary,
      }}
    >
      <StatusBar />

      <ScrollView style={{ flex: 1, paddingTop: 10 }}>
        {/* Store Name */}
        <View>
          <Text
            style={{
              fontSize: 75,
              color: ThemeColors.primary,
              textAlign: "center",
            }}
          >
            Shiro
          </Text>

          <Text
            style={{
              fontSize: 20,
              color: ThemeColors.primary,
              textAlign: "center",
              letterSpacing: 5,
              top: -15,
            }}
          >
            Online Store
          </Text>
        </View>

        {/* Sign Up Form */}
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          {/* Signup Headlines */}
          <Text
            style={{ color: ThemeColors.third, fontSize: 24, fontWeight: 500 }}
          >
            Sign Up
          </Text>

          <Text
            style={{
              color: ThemeColors.fourth,
              fontSize: 16,
              fontWeight: 400,
              marginTop: 10,
            }}
          >
            Please enter the following infos
          </Text>

          {/* Username Input */}
          <Text
            style={{
              color: ThemeColors.fourth,
              fontSize: 16,
              fontWeight: 500,
              marginTop: 40,
            }}
          >
            Username
          </Text>

          <TextInput
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => handleChange("username", text)}
            maxLength={15}
            keyboardType="name-phone-pad"
            style={{
              borderColor: ThemeColors.fifth,
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 15,
            }}
          />

          {/* Email input */}
          <Text
            style={{
              color: ThemeColors.fourth,
              fontSize: 16,
              fontWeight: 500,
              marginTop: 40,
            }}
          >
            Email
          </Text>

          <TextInput
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            style={{
              borderColor: ThemeColors.fifth,
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 15,
            }}
          />

          {/* Password input */}
          <Text
            style={{
              color: ThemeColors.fourth,
              fontSize: 16,
              fontWeight: 500,
              marginTop: 40,
            }}
          >
            Password
          </Text>

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
              autoCapitalize="none"
              value={password}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry={eyeSecurity}
              maxLength={20}
              keyboardType="ascii-capable"
              style={{
                fontSize: 17,
                marginTop: 15,
                flex: 0.9,
              }}
            />

            <Ionicons
              onPress={toggleEye}
              name={eyeSecurity == true ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="black"
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={console.log("Sign Up")}
            style={{
              backgroundColor: ThemeColors.primary,
              marginTop: 30,
              height: 70,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 19,
                color: ThemeColors.secondary,
                fontWeight: 500,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          {/* Already have an account + Login */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              gap: 5,
            }}
          >
            <Text style={{ fontSize: 16 }}>Already have an account?</Text>

            <TouchableOpacity onPress={goLogin}>
              <Text
                style={{
                  fontSize: 15,
                  color: ThemeColors.primary,
                  fontWeight: 600,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
