import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";

const auth = getAuth();

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const navigation = useNavigation();

  let validateAndSet = (value, setValue) => {
    setValue(value);
  };

  function checkPassword(firstpassword, secondpassword) {
    if (firstpassword !== secondpassword) {
      setValidationMessage("Password do not match");
    } else setValidationMessage("");
  }

  async function createAccount() {
    email === "" || password === ""
      ? setValidationMessage("required filled missing")
      : "";
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("Login");
    } catch (error) {
      setValidationMessage(error.message);
    }
  }

  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="cover"
        className="flex-1 justify-center items-center pb-32"
        source={require("../assets/images/gradientYellow.jpg")}
      >
        <Image
          source={require("../assets/images/snapchatLogo.png")}
          className="h-12 w-12"
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="white"
          className="mt-8 w-56"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="white"
          className="mt-8 w-56"
          value={password}
          onChangeText={(value) => validateAndSet(value, setPassword)}
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="white"
          className="mt-8 w-56"
          value={confirmPassword}
          onChangeText={(value) => validateAndSet(value, setConfirmPassword)}
          secureTextEntry
          autoCapitalize="none"
          onBlur={() => checkPassword(password, confirmPassword)}
        />
        {<Text className="mt-2 text-white">{validationMessage}</Text>}

        {/* Sign up Button */}
        <View className="items-center justify-center">
          <TouchableOpacity
            className="bg-white p-4 rounded-2xl w-28 items-center justify-center mt-2"
            onPress={createAccount}
          >
            <Text className="font-bold">Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Button Subtext */}
        <View className="items-center justify-center">
          <Text className="mt-2 text-white">
            Already have an account?
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              className="ml-8 mt-2"
            >
              <Text className="text-white font-bold">Login Here</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignUpScreen;
