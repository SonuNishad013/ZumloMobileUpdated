import React from 'react'
import CommonHeader from '../../components/Header/commonHeader'
import { strings } from '../../constant/strings'
import colors from '../../constant/colors'
import { moderateScale, textScale } from '../../constant/responsiveStyle'
import navigationString from '../../navigation/navigationString'

interface Props{
    navigation?:any
}
const HeaderWellnessPlan:React.FC<Props> = ({navigation}) => {
  return (
    <CommonHeader
      headerName={strings.WellnessHeader}
      onBackPress={() => navigation?.goBack()}
      mainContainer={{marginHorizontal:moderateScale(19), marginTop:moderateScale(15)}}
      iconContainer={{ backgroundColor: colors?.darkPrussianBlue, }}
      skip={false}
      skipTextStyle={{color:colors?.orgDark, fontSize:textScale(16), fontWeight:'500'}}
      // onSkipPress={()=>navigation?.navigate(navigationString?.)}
    />
  )
}
export default HeaderWellnessPlan
