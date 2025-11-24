import React, { ReactElement, useMemo } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import {
    CalendarIcon,
    ChatIcon,
    ClossIcon,
    ElephantIcon,
    NotificationIcon,
    OpeingIcon,
    SmileEmojiIcon,
} from "../../../assets";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { styles } from "./style";
import { imagePath } from "../../../assets/png/imagePath";
interface Props {
    navigation?: any;
    date?: string;
    notificationData?: number;
    greetingMsg?: any;
}
interface IconContainerProps {
    icon: React.ReactNode;
    onPress?: () => void;
    notificationCount?: number;
    type?: string;
}
const DashboardHeader: React.FC<Props> = ({ date,
    notificationData,
    greetingMsg, }): ReactElement => {
    const IconContainer: React.FC<IconContainerProps> = useMemo(
        () => ({ icon, onPress, notificationCount, type }: IconContainerProps): ReactElement => (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.iconContainer}>
                    {icon}
                    {!!notificationCount && (
                        <View style={styles.notificationCountContainer}>
                            <Text style={styles.notificationCountText}>{notificationCount}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        ),
        []
    );

    const UserInfoView: React.FC = useMemo(
        () => (): ReactElement => (
            <View style={styles.userInfoContainer}>
                <View style={styles.profileImageContainer}>
                    <Image source={imagePath.ProfileIcon} style={styles.profileImage} />
                </View>
                <View style={styles.userInfoTextContainer}>
                    <Text style={styles.userInfoName}>{`${"Hi, Selena James!"}`}</Text>
                    <View style={styles.userStatusContainer}>
                        <View style={styles.smileEmojiContainer}>
                            <SmileEmojiIcon />
                        </View>
                        <Text style={styles.userStatusText}>{"Happy"}</Text>
                    </View>
                </View>
            </View>
        ),
        []
    );
    interface GreetingMsgViewProps {
        greetingMsg: {
            name: string;
            // Add other properties as needed
        }[];
        closeButtonIcon: React.ReactNode;
        openingIcon: React.ReactNode;
        additionalIcon: React.ReactNode; // Add more icons as needed
    }
    const GreetingMsgView: React.FC<GreetingMsgViewProps> = useMemo(
        () => ({ greetingMsg, closeButtonIcon, openingIcon, additionalIcon }): ReactElement => {
            return (
                <View style={{ backgroundColor: colors.prussianBlue, borderRadius: moderateScale(15) }}>
                    <View
                        style={{
                            // height: moderateScale(105),
                            flexDirection: 'row',
                            marginHorizontal: moderateScale(15),
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginVertical: moderateScale(5)
                        }}
                    >
                        <View style={{ width: moderateScale(200) }}>
                            {closeButtonIcon}
                            <Text style={{ color: colors.SurfCrest, fontSize: textScale(16), fontWeight: '700' }}>{`${greetingMsg}`}</Text>
                            {openingIcon}
                            {/* Add more icons as needed */}
                        </View>
                        {additionalIcon}
                    </View>
                </View>
            );
        },
        []
    );

    return (
        <>
            <View style={styles.mainContainer}>
                <View style={styles.dateContainer}>
                    <CalendarIcon width={moderateScale(21)} height={moderateScale(22)} />
                    <View style={styles.dateTextContainer}>
                        <Text style={styles.dateStyle}>{date}</Text>
                    </View>
                </View>
                <View style={styles.notificationContainer}>
                    <IconContainer icon={<ChatIcon />} type="chat" />
                    <IconContainer
                        icon={<NotificationIcon />}
                        onPress={() => {
                            /* handle notification icon press */
                        }}
                        notificationCount={notificationData}
                        type="notification"
                    />
                </View>
            </View>
            {useMemo(() => <UserInfoView />, [])}
            <View style={{ marginVertical: moderateScale(20) }}>
                <GreetingMsgView
                    greetingMsg={greetingMsg?.[0]?.name}
                    closeButtonIcon={<ClossIcon />}
                    openingIcon={<OpeingIcon />}
                    additionalIcon={<ElephantIcon />}
                />
            </View>
        </>
    )
}
export default DashboardHeader;