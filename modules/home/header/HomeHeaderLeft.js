import { observer } from "mobx-react-lite";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Avatar } from "react-native-elements";
import useAuth from "../../../hooks/useAuth";

const HomeHeaderLeft = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={signOut}
      activeOpacity={0.5}
      className="flex-start mt-5"
    >
      {/* <Avatar rounded source={{ uri: user.photoURL }} /> */}
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};

export default observer(HomeHeaderLeft);
