import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MyGroups from "./ProfileTabs/MyGroups";
import MyFeeds from "./ProfileTabs/MyFeeds";
import MyActivities from "./ProfileTabs/MyActivities";
import ToggleBar from "./ToggleBar";
import appConstant from "../../../../constant/appConstant";
interface Props {
  navigation?: any;
  toasterFunction?: any;
  setToasterDetails?: any;
  sendtrigger?: any;
}

const ProfileTab: React.FC<Props> = ({
  navigation,
  toasterFunction,
  setToasterDetails,
  sendtrigger,
}) => {
  const [selectedTab, setSelectedTab] = useState<any>(0);
  useEffect(() => {
    sendtrigger();
  }, []);

  return (
    <>
      <ToggleBar
        data={appConstant?.profileDetailsTab}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {selectedTab == 0 && (
        <MyFeeds
          toasterFunction={toasterFunction}
          setToasterDetails={setToasterDetails}
          navigation={navigation}
        />
      )}
      {selectedTab == 1 && (
        <MyGroups navigation={navigation} toasterFunction={toasterFunction} />
      )}
      {selectedTab == 2 && (
        <MyActivities
          navigation={navigation}
          toasterFunction={toasterFunction}
        />
      )}

      <View />
    </>
  );
};

export default ProfileTab;
