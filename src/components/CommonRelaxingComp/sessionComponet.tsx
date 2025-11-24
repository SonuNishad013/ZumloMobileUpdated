import React, { ReactElement } from "react";
import ScreenWrapper from "../SafeArea/SafeAreaWrapper";
import colors from "../../constant/colors";
import CommonSleepingComp from ".";
interface Props {
    navigation?: any;
    textColor?: any
    lineargrediantColor?: any
    lowerImageBackgroundColor?: any
    headerName?: any
    Data?: any
    exerciseData?: any
    SleepRelaxIcon?: any
    SleepRelaxIconWidth?: any
    loginUser?: any
    logeduserDescription?: any
}
const SessionsComp: React.FC<Props> = ({
    navigation, textColor,
    lineargrediantColor,
    lowerImageBackgroundColor,
    headerName,
    Data,
    exerciseData,
    SleepRelaxIcon,
    SleepRelaxIconWidth,
    loginUser,
    logeduserDescription
}): ReactElement => {
    return (
        <ScreenWrapper statusBarColor={colors.lightTheme}>
            <CommonSleepingComp
                textColor={textColor}
                lineargrediantColor={lineargrediantColor}
                lowerImageBackgroundColor={lowerImageBackgroundColor}
                headerName={headerName}
                Data={Data}
                exerciseData={exerciseData}
                SleepRelaxIcon={SleepRelaxIcon}
                SleepRelaxIconWidth={SleepRelaxIconWidth}
                loginUser={loginUser}
                logeduserDescription={logeduserDescription}
            />
        </ScreenWrapper>
    )
}
export default SessionsComp;