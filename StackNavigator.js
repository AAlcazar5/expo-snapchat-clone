import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import useAuth from "./hooks/useAuth";
import { store, StoreContext } from "./modules/stores/store";
import HomeScreen from "./screens/HomeScreen";
import PostsCreateScreen from "./screens/PostsCreateScreen";
import PostsPreview from "./modules/posts/preview/PostsPreview";
import PostsView from "./modules/posts/view/PostsView";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();

  return (
    <StoreContext.Provider value={store}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Group>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="PostsCreate"
                component={PostsCreateScreen}
                options={{ headerBackTitle: "Back to Posts" }}
              />
              <Stack.Screen
                name="PostsPreview"
                component={PostsPreview}
                options={{ headerBackTitle: "Back to Create" }}
              />
              <Stack.Screen
                name="PostsView"
                component={PostsView}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Sign Up" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </StoreContext.Provider>
  );
};

export default StackNavigator;
