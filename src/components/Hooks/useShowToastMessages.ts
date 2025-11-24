import { useCallback } from "react";
import Toast from "react-native-toast-message";

const useShowToastMessages = () => {
  const showToast = useCallback(
    (type: "success" | "error" | "info", text1: string, text2?: string) => {
      Toast.show({ type, text1, text2 });
    },
    []
  );

  return { showToast };
};

export default useShowToastMessages;
