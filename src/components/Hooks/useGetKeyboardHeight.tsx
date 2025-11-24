import React, { useEffect, useState } from "react";

import { Keyboard, KeyboardEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const useGetKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const insets = useSafeAreaInsets();

  function onKeyboardDidShow(e: KeyboardEvent) {
    setKeyboardHeight(e.endCoordinates.height - insets?.bottom);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardDidShow
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardDidHide
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return { keyboardHeight };
};

export default useGetKeyboardHeight;
