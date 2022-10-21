import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Button, Icon } from "react-native-elements";

import { useStore } from "../../stores/store";

const PostsPreviewBottom = () => {
  const { sendPicture } = useStore().cameraStore;
  const navigation = useNavigation();

  const handleSendPicture = async () => {
    const success = await sendPicture();

    if (success) {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.bottomContainer}>
      <Button
        buttonStyle={styles.button}
        title="Send Now"
        titleStyle={styles.buttonTitle}
        icon={<Icon type="material" name="send" />}
        iconPosition="right"
        onPress={handleSendPicture}
      />
    </View>
  );
};

export default PostsPreviewBottom;

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 30,
  },
  button: {
    backgroundColor: "#FFFC00",

    borderRadius: 9999,
    padding: 10,
  },
  buttonTitle: {
    marginRight: 5,
    color: "black",
  },
});
