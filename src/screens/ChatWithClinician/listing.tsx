import React, { ReactElement, useState } from "react";
import { View, FlatList } from "react-native";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import colors from "../../constant/colors";
import { moderateScale } from "../../constant/responsiveStyle";
import CommonHeader from "../../components/Header/commonHeader";
import { MenuIcon } from "../../assets";
import ChatList from "../../components/Chat List";

interface Props {
  navigation?: any;
}

const ChatListing: React.FC<Props> = ({ navigation }): ReactElement => {
  const [list, setlist] = useState([
    {
      id: 1,
      msgHistory: [
        {
          sender: "John Doe",
          image: "https://picsum.photos/200",
          message: `Great, don't forget to bring me some mangoes.`,
          time: "6:05 PM",
        },
        {
          sender: "John Doe",
          image: "https://picsum.photos/200",
          time: "6:05 PM",
        },
        {
          sender: "John Doe",
          image: "https://picsum.photos/200",
          message: `Great, don't forget to bring me some mangoes.`,
          time: "6:05 PM",
        },
      ],
      name: "Zumlo Official",
      image: "https://picsum.photos/200",
      groupMember: [
        {
          name: "John Doe",
          image: "https://picsum.photos/200",
        },
        {
          name: "Dr. John",
          image: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
        },
        {
          name: "John",
          image: "https://picsum.photos/200",
        },
        // {
        //     name: 'John Doe',
        //     image: "https://picsum.photos/200",
        // },
      ],
      isGroup: true,
      isActive: true,
      time: new Date(),
    },
    {
      id: 2,
      msgHistory: [
        {
          sender: "John Doe",
          image: "https://picsum.photos/200",
          message: `Great, don't forget to bring me some mangoes.`,
          time: "6:05 PM",
        },
        {
          sender: "John Doe",
          image: "https://picsum.photos/200",
          message: `Great, don't forget to bring me some mangoes.`,
          time: "6:05 PM",
        },
        {
          sender: "John Doe",
          image: "https://picsum.photos/200",
          message: `Great, don't forget to bring me some mangoes.`,
          time: "6:05 PM",
        },
      ],
      groupMember: [],
      name: "Robert",
      image: "https://picsum.photos/200",
      isGroup: false,
      isActive: true,
      time: new Date(),
    },
    {
      id: 3,
      msgHistory: [
        {
          sender: "John Doe",
          image: "https://picsum.photos/200",
          message: `Great, don't forget to bring me some mangoes.`,
          time: "6:05 PM",
        },
        {
          sender: "John Doe",
          image: "https://picsum.photos/200",
          message: `Great, don't forget to bring me some mangoes.`,
          time: "6:05 PM",
        },
        {
          sender: "John Doe",
          image: "https://picsum.photos/200",
          message: `Great, don't forget to bring me some mangoes.`,
          time: "6:05 PM",
        },
      ],
      groupMember: [
        {
          name: "John Doe",
          image: "https://picsum.photos/200",
        },
        {
          name: "Dr. John",
          image: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
        },
        {
          name: "John",
          image: "https://picsum.photos/200",
        },
        {
          name: "John Doe",
          image: "https://picsum.photos/200",
        },
      ],
      name: "Robert",
      image: "https://picsum.photos/200",
      isGroup: true,
      isActive: true,
      time: new Date(),
    },
  ]);
  const renderListing = (item: any, index: any) => {
    return <ChatList item={item} />;
  };

  return (
    <ScreenWrapper statusBarColor={colors.lightTheme2}>
      <View
        style={{
          marginHorizontal: moderateScale(15),
          marginTop: moderateScale(10),
        }}
      >
        <CommonHeader
          headerName={"Chats"}
          isOtherIcon
          OtherIcon={MenuIcon}
          OtherIconWidth={moderateScale(25)}
          OtherIconHeight={moderateScale(25)}
          // onOtherIcon={()=>on}
        />
        <FlatList
          keyExtractor={(item, index) => "key" + index}
          data={list}
          renderItem={({ item, index }) => renderListing(item, index)}
        />
      </View>
    </ScreenWrapper>
  );
};
export default ChatListing;
