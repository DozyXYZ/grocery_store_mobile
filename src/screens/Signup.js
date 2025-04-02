import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "../utils/ThemeColors";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { authentication, database } from "../../Firebase-Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { AuthInputField } from "../components/AuthInputField";
import { AuthStoreName } from "../components/AuthStoreName";
import { GreenButton } from "../components/GreenButton";

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

  const handleSignup = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        set(ref(database, `users/${user.uid}`), {
          username: username,
          email: email,
        })
          .then(() => {
            goLogin();
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("Signup Error", "The email address is already in use.");
        } else if (error.code === "auth/invalid-email") {
          Alert.alert("Signup Error", "The email address is invalid.");
        } else {
          Alert.alert("Signup Error", "An error occurred. Please try again.");
        }
        console.error("Error creating user:", error);
      });
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
        <AuthStoreName />

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
          <AuthInputField
            label="Username"
            value={username}
            onChangeText={(text) => handleChange("username", text)}
            maxLength={15}
            keyboardType="name-phone-pad"
          />

          {/* Email input */}
          <AuthInputField
            label="Email"
            value={email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
          />

          {/* Password input */}
          <AuthInputField
            label="Password"
            value={password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={eyeSecurity}
            toggleSecureEntry={toggleEye}
            maxLength={20}
            keyboardType="ascii-capable"
            icon={eyeSecurity ? "eye-off-outline" : "eye-outline"}
          />

          {/* Sign Up Button */}
          <GreenButton onPress={handleSignup} title="Sign Up" />

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
