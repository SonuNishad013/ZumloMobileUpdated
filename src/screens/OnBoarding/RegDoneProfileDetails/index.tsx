import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import HeaderWithSkip from "../OnBoardedBy/HeaderWithSkip";
import UserInfoList from "./UserInfoList";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import _ from "underscore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import moment from "moment";
import { MMMM_D } from "../../../constant/dateFormatConstants";
import LoaderSurf from "../../../components/Loader/LoaderSurf";
interface Props {
  navigation?: any;
}
const RegDoneProfileDetails: React.FC<Props> = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [medicalHistoryData, setmedicalHistoryData] = useState([]);
  const dispatch = useDispatch();

  const nav = useNavigation();

  // Use useEffect hook for one-time setup
  useEffect(() => {
    // Add event listener when the component mounts
    const unsubscribe = nav.addListener("beforeRemove", () => {
      // Call your function when the user navigates back
      GetInvitedSeekerDetails();
    });

    // Clean up the event listener when the component unmounts
    return unsubscribe;
  }, []);

  // Use useFocusEffect hook for triggering the effect on focus
  useFocusEffect(
    React.useCallback(() => {
      // Call your function when the screen is focused
      GetInvitedSeekerDetails();

      // Cleanup function (optional)
      return () => {
        // Additional cleanup code if needed
      };
    }, [])
  );

  const [SeekerID, setSeekerID] = useState("");
  useEffect(() => {
    GetInvitedSeekerDetails();
  }, []);
  const [isMedicalDetailsEditable, setisMedicalDetailsEditable] =
    useState(false);
  const GetInvitedSeekerDetails = () => {
    setisLoading(true);

    let requestbody = {};
    allActions.Auth.GetInvitedSeekerDetails(
      dispatch,
      requestbody,
      "GetInvitedSeekerDetails"
    )
      .then((response: any) => {
        console.log("response===>GetInvitedSeekerDetails", response);
        setisLoading(false);
        if (response.statusCode == 200) {
          let data: any = [
            {
              headerText: "Basic Info",
              data: !_.isEmpty(
                response?.data?.seekerDetails?.firstName ||
                  response?.data?.seekerDetails?.gender ||
                  response?.data?.seekerDetails?.age ||
                  response?.data?.seekerDetails?.description
              ),
              infomation: [
                {
                  title: "Name",
                  value: response?.data?.seekerDetails?.firstName,
                },
                {
                  title: "Gender",
                  value: response?.data?.seekerDetails?.gender,
                },
                {
                  title: "Age",
                  value: response?.data?.seekerDetails?.age,
                },
                {
                  title: "About",
                  value: response?.data?.seekerDetails?.description,
                },
              ],
            },
            {
              headerText: "Contact Details",
              data: !_.isEmpty(
                response?.data?.seekerDetails?.email ||
                  response?.data?.seekerDetails?.city ||
                  response?.data?.seekerDetails?.addressLine1 ||
                  response?.data?.seekerDetails?.addressLine2 ||
                  response?.data?.seekerDetails?.phoneNumber ||
                  response?.data?.seekerDetails?.Zipcode
              ),
              infomation: [
                {
                  title: "Phone Number",
                  value: response?.data?.seekerDetails?.phoneNumber,
                  countryCode: response?.data?.seekerDetails?.countryCode,
                },
                {
                  title: "Email",
                  value: response?.data?.seekerDetails?.email,
                },
                {
                  title: "Country",
                  value: response?.data?.seekerDetails?.country,
                },
                {
                  title: "Address",
                  value: response?.data?.seekerDetails?.addressLine1,
                },
                {
                  title: "Zipcode",
                  value: response?.data?.seekerDetails?.zipCode,
                },
              ],
            },
            {
              headerText: "Medical History",
              data: response?.data?.medicalHistory?.length > 0 ? true : false,
              infomation: [
                {
                  title: "Treatment name",
                  value: response?.data?.medicalHistory?.[0]?.diagnosis,
                },
                {
                  title: "Start date",
                  value: moment(
                    response?.data?.medicalHistory?.[0]?.diagnosisDate
                  ).format(MMMM_D),
                },
                {
                  title: "End date",
                  value: moment(
                    response?.data?.medicalHistory?.[0]?.diagnosisEndDate
                  ).format(MMMM_D),
                },
                {
                  title: "Medication",
                  value:
                    response?.data?.medicalHistory?.[0]
                      ?.medicalHistory_Medications?.[0]?.medicationName,
                },
              ],
            },
          ];
          setUserInfo(data);
          setSeekerID(response?.data?.seekerDetails?.seekerId);
          setmedicalHistoryData(
            response?.data?.medicalHistory?.length > 0
              ? response?.data?.medicalHistory
              : []
          );
          setisMedicalDetailsEditable(
            response?.data?.seekerDetails?.seekerId > 0 ? true : false
          );
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };

  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <HeaderWithSkip
        hName={"Profile Details"}
        navigation={navigation}
        skip={false}
      />
      <ScrollView>
        <UserInfoList
          userInfo={userInfo}
          navigation={navigation}
          SeekerID={SeekerID}
          medicalHiostoryData={medicalHistoryData}
          isMedicalDetailsEditable={isMedicalDetailsEditable}
        />
      </ScrollView>
      <Toast />
      {isLoading && <LoaderSurf />}
    </ScreenWrapper>
  );
};

export default RegDoneProfileDetails;
