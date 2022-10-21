import { createContext, useContext } from "react";
import CameraStore from "./cameraStore";
import PostStore from "./postStore";

export const store = {
  cameraStore: new CameraStore(),
  postStore: new PostStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};

export const resetStore = () => {
  const { cameraStore, postStore } = store;
  cameraStore.reset();
  postStore.reset();
};
