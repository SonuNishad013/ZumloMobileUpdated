import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale, textScale } from '../../../constant/responsiveStyle';
import { imagePath } from '../../../assets/png/imagePath';
import colors from '../../../constant/colors';

interface Props {
    docterInfo?: any
}
const DoctorDetails: React.FC<Props> = ({ docterInfo }) => {
    return (
        <View style={styles?.mainContainer}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={imagePath?.DoctorImage} style={styles.image} />
                </View>
                <Text style={styles.doctorName}>{"Dr."} {docterInfo?.data?.firstName + " " + docterInfo?.data?.lastName}</Text>

                {
                    docterInfo?.data?.clinicianSpecific.map((item: any, index: any, data: any) => {
                        return (
                            <>
                                {index + 1 === data.length ?
                                    <Text style={styles.doctorType}>{item?.detailValue + "."}</Text>
                                    :
                                    <Text style={styles.doctorType}>{item?.detailValue + ","}</Text>
                                }
                            </>
                        )
                    })
                }
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>{"Email Address"}</Text>
                    <Text style={styles.infoText}>{docterInfo?.data?.email}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>{"Phone no."}</Text>
                    <Text style={styles.infoText}>{docterInfo?.data?.phoneNumber}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>{"City"}</Text>
                    <Text style={styles.infoText}>{docterInfo?.data?.city}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>{"Address"}</Text>
                    <Text style={styles.infoText}>{docterInfo?.data?.addressLine1}</Text>
                </View>
            </View>
            <Text style={styles?.noteStyle}>
                {"You have been onboarded in the Zumlo by your clinician"}
            </Text>
        </View>

    );
}

const styles = StyleSheet.create({
    mainContainer: { marginHorizontal: moderateScale(19), marginTop: moderateScale(85) },
    container: {
        alignItems: 'center',
    },
    imageContainer: {
        width: moderateScale(136),
        height: moderateScale(136),
        borderRadius: moderateScale(68),
        overflow: 'hidden',
        borderWidth: moderateScale(10),
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors?.prussianBlue,
    },
    image: {
        width: '95%',
        height: '95%',
        borderRadius: moderateScale(68),
    },
    doctorName: {
        fontSize: textScale(24),
        fontWeight: '700',
        color: colors?.SurfCrest,
        marginTop: moderateScale(15)
    },
    doctorType: {
        fontSize: textScale(14),
        fontWeight: '600',
        color: colors?.royalOrange,
        marginTop: moderateScale(2)

    },
    infoContainer: {
        backgroundColor: colors?.SaltBox,
        borderRadius: moderateScale(6),
        marginTop: moderateScale(40)
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: moderateScale(5),
        paddingHorizontal: moderateScale(15),
        paddingVertical: moderateScale(10),
    },
    infoLabel: {
        fontSize: textScale(14),
        fontWeight: "400",
        color: colors?.SurfCrest,
        flex: 0.7
    },
    infoText: {
        fontSize: textScale(14),
        fontWeight: "400",
        color: colors?.SurfCrest,
        flex: 1,
    },
    noteStyle: {
        fontSize: textScale(14),
        fontWeight: '600',
        color: colors?.SurfCrest,
        marginTop: moderateScale(20),
        textAlign: "center",
    }
});
export default DoctorDetails;