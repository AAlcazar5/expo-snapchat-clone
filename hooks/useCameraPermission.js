import { useEffect, useState } from "react";
import { Camera } from "expo-camera";

const useCameraPermission = () => {
  const [permission, setPermission] = useState("");

  useEffect(() => {
    void (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  return permission;
};

export default useCameraPermission;
