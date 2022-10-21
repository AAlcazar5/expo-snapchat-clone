import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";

import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const HomeButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PostsCreate")}
      style={styles.container}
    >
      <Icon type="material" name="circle" size={40} />
    </TouchableOpacity>
  );
};

export default HomeButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    left: "44%",
    zIndex: 50,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "gray",
    borderRadius: 999,
  },
});
