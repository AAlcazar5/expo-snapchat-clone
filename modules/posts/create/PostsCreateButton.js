import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Icon } from "react-native-elements";

import { useStore } from "../../stores/store";

const PostsCreateButton = () => {
  const { takePicture } = useStore().cameraStore;

  const handleTakePicture = async () => {
    const navigation = useNavigation();
    const success = await takePicture();

    if (success) {
      navigation.navigate("PostsPreview");
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={handleTakePicture}
    >
      <Icon type="material" name="circle" size={40} color="white" />
    </TouchableOpacity>
  );
};

export default PostsCreateButton;

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
