import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { getUserLoginDetails } from "../../redux/selector";
import * as AsyncStorageUtils from "../../utils/Storage/AsyncStorage";
import allActions from "../../redux/actions";

const useLogout = (setIsLoading: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userLoginDetails = useSelector(getUserLoginDetails());

  const handleLogout = async () => {
    try {
      setIsLoading && setIsLoading(true);
      const CheckMpinLogin = await AsyncStorageUtils.getItem(
        AsyncStorageUtils.MPIN_SET
      );
      const CheckBioMetric = await AsyncStorageUtils.getItem(
        AsyncStorageUtils.BIOMETRIC_SET
      );
      // const MpinUserData: any = await AsyncStorageUtils.getItem(AsyncStorageUtils.MPIN_USERDATA);
    
      let requestBody = { //req
        UserKey: userLoginDetails.data.userKey,
        ForceLogout: 0,
      };
      const logoutRes = await allActions?.loginAction?.logoutApi( //api for logout
        dispatch,
        requestBody,
        "Password_SubmitLogin"
      );
      setIsLoading && setIsLoading(false);
      if (logoutRes?.returnCode === 200) {
      
      }
    } catch (error) {
      setIsLoading && setIsLoading(false);
    }
  };
  return { handleLogout };
};

export default useLogout;
