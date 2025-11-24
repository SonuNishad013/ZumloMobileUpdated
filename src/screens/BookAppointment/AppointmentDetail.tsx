import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground,
    StyleSheet,
} from "react-native";
import React, { ReactElement } from "react";
import colors from "../../constant/colors";
import CommonHeader from "../../components/Header/commonHeader";
import { strings } from "../../constant/strings";
import { moderateScale } from "../../constant/responsiveStyle";
import CommonButton from "../../components/Buttons/commonButton";
import ProfileCard from "../../components/Cards/profileCard";
import { imagePath } from "../../assets/png/imagePath";
import { BlueCallIcon, Calender, Clock, IconClock, Phone } from "../../assets";

interface Props {
    navigation?: any
}

const AppointmentDetail: React.FC<Props> = ({
    navigation
}): ReactElement => {

    const profileIcon = imagePath.ProfileIcon

    const longText = 'TESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEW'


    const header = () => (
        <View style={styles.headerBackGround}>
            <CommonHeader headerName={strings?.headerAppointmentDetail}/>
        </View>
    )

    const profilecard = () => (
        <ProfileCard
            source={profileIcon} 
            Name={'Dr.Imran Syahir'} 
            Profession={"General Doctor"}
            title={strings.cardTitle}
            longtext={longText}
        />
    )

    const Duration = () => (
        <View style={styles.DurationOuterView}>
            <View style={styles.DurationView}>
                <Clock height={20} width={20}/>
                <View style={{marginLeft:moderateScale(10)}}>
                    <Text style={styles.DurationText}>{strings?.consultDuration}</Text>
                </View>
            </View>
        </View>
    )

    const AppointDetails = () => (
        <View style={styles.appointDetailsView}>
            <Text style={styles.headingAppointText}>{strings?.headingAppointment}</Text>
            <View style={styles.DetailsInternalView}>
                <View style={styles.internalViews}> 
                  <Calender height={20} width={20}/>
                  <View style={styles.TextView}>
                    <Text style={styles.text}>{'Wed, 14 Oct'}</Text> 
                  </View>
                </View>
                <View style={styles.internalViews}> 
                  <IconClock height={20} width={20}/>
                  <View style={styles.TextView}>
                    <Text style={styles.text}>{'12:30'}</Text> 
                  </View>
                </View>
                <View style={styles.internalViews}> 
                  <BlueCallIcon height={20} width={20}/>
                  <View style={styles.TextView}>
                    <Text style={styles.text}>{'On Call'}</Text> 
                  </View>
                </View>
            </View>
        </View>
    )

    const AppointmentPurpose = () => (
        <View style={styles.AppointmentPurposeView}>
            <View>

            </View>
        </View>
    )

    const Button = () => (
        <View style={styles.ButtonView}>
            <CommonButton btnName={strings?.commonButtonName}/>
        </View>
    )

    return (
        <View style={styles.container}>
            {header()}
            <View style={styles.innerView}>
                {profilecard()}
                {Duration()}
                {AppointDetails()}
            </View>
            {Button()}
        </View>
    )
}
export default AppointmentDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors?.SurfCrest
    },
    headerBackGround:{
        backgroundColor:colors.prussianBlue,
        paddingVertical:moderateScale(50),
        paddingHorizontal: moderateScale(15),
        borderBottomLeftRadius: moderateScale(30),
        borderBottomRightRadius:moderateScale(30),
    },
    ButtonView:{
        flex:0.2,
        alignSelf:'center',
    },
    innerView:{
        padding: moderateScale(10),
        // alignSelf:'center',
        position:'relative',
        bottom:moderateScale(30)
    },
    DurationOuterView:{
        paddingTop: moderateScale(15),
        alignSelf:'center',
    },
    DurationView:{
        flexDirection:"row",
        backgroundColor:colors?.backgroundTheme,
        padding:moderateScale(10),
        width:moderateScale(335),
        borderRadius:moderateScale(20),
        alignItems:'center'
    },
    DurationText:{
        color:colors?.SurfCrest,
        fontWeight: '500',
        fontSize:12,
    },
    appointDetailsView:{
        paddingTop: moderateScale(15),
        width: moderateScale(335),
        alignSelf:'center'
    },
    headingAppointText:{
        fontFamily:'Poppins-Regular',
        fontWeight:'600',
        fontSize:14,
    },
    internalViews:{
        flexDirection:'row',
        alignItems:'center',
    },
    DetailsInternalView:{
        paddingTop: moderateScale(15),
        flexDirection:'row',
        justifyContent:'space-between'
    },
    TextView:{
        marginLeft:moderateScale(5)
    },
    text:{
        fontFamily:'Poppins-Regular',
        fontSize:14,
        fontWeight: '400',
        color:colors?.prussianBlue
    },
    AppointmentPurposeView:{
        
    },
});

