import { useEffect } from "react";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

function useNetworkInfo() {
  const { isConnected: isInternetConnected } = useNetInfo();
  const { type } = NetInfo.useNetInfo();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      var isConnnect: any = state?.isConnected;
      try {
      } catch (e) {
        console.log("Failed to save the data to the storage");
      }
    });
    return () => unsubscribe();
  }, []);
  return {
    isInternetConnected,
    netInfo: {
      type,
    },
  };
}

export default useNetworkInfo;
