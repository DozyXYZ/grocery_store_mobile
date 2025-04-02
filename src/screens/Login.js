import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "../utils/ThemeColors";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { AuthStoreName } from "../components/AuthStoreName";
import { AuthInputField } from "../components/AuthInputField";
import { GreenButton } from "../components/GreenButton";
import { authentication, database } from "../../Firebase-Config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";

const Login = () => {
  const nav = useNavigation();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleChange = (name, value) => {
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const [eyeSecurity, setEyeSecurity] = useState(true);

  const toggleEye = () => {
    setEyeSecurity(!eyeSecurity);
  };

  const goSignup = () => {
    nav.navigate("Signup");
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        const userRef = ref(database, `users/${user.uid}`);

        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            Alert.alert("Login Success", `Welcome back! ${userData.username}`);
            nav.navigate("Store", { userData });
          } else {
            console.log("No user data found");
            Alert.alert("Login Error", "User data not found.");
          }
        });
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          Alert.alert("Login Error", "No user found with this email.");
        } else if (error.code === "auth/wrong-password") {
          Alert.alert("Login Error", "Incorrect password.");
        } else {
          Alert.alert("Login Error", "An error occurred. Please try again.");
        }
        console.error("Error signing in:", error);
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

        {/* Login Form */}
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          {/* Login Headlines */}
          <Text
            style={{ color: ThemeColors.third, fontSize: 24, fontWeight: 500 }}
          >
            Login
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

          {/* Login Button */}
          <GreenButton onPress={handleLogin} title="Login" />

          {/* Don't have an account + Signup */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              gap: 5,
            }}
          >
            <Text style={{ fontSize: 16 }}>Don't Have An Account?</Text>

            <TouchableOpacity onPress={goSignup}>
              <Text
                style={{
                  fontSize: 15,
                  color: ThemeColors.primary,
                  fontWeight: 600,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
