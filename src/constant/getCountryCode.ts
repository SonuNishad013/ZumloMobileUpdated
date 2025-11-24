import * as RNLocalize from "react-native-localize";
import * as AsyncStorageUtils from "../utils/Storage/AsyncStorage";
import logger from "./logger";

// country code list "https://www.iban.com/country-codes"
// currency code list "https://www.iban.com/currency-codes"

//below is the list of countries which will be supported
// Localization & International Pricing:** Yes, we are setting up subscriptions for the following regions initially:
// * North America: United States, Canada
// * South Asia: India
// * Middle East (Proposed List): United Arab Emirates (UAE), Saudi Arabia (KSA), Qatar, Kuwait, Bahrain, Oman, Egypt, Jordan, Lebanon, Morocco, Israel, Turkey

export const getCountryCode = async () => {
  const CountryCodeData: any = await AsyncStorageUtils.getItem(
    AsyncStorageUtils.COUNTRY_CODE
  );
  // const CountryCodeData: any = "IN";
  if (!!CountryCodeData?.length) {
    return CountryCodeData;
  } else {
    const locales: any = RNLocalize.getLocales();

    if (locales.length > 0) {
      const countryCode = locales[0].countryCode; // e.g., "US"

      // const currencyMap: any = {
      //   US: "USD", //United States
      //   CA: "CAD", //Canada
      //   IN: "INR", //India
      //   AE: "AED", //United Arab Emirates (UAE)
      //   SA: "SAR", //Saudi Arabia (KSA)
      //   QA: "QAR", //Qatar
      //   KW: "KWD", //Kuwait
      //   BH: "BHD", //Bahrain
      //   OM: "OMR", //Oman
      //   EG: "EGP", //Egypt
      //   JO: "JOD", //Jordan
      //   LB: "LBP", //Lebanon
      //   MA: "MAD", //Morocco
      //   IL: "ILS", //Israel
      //   TR: "TRY", //Turkey
      // };
      // const currencyCode = currencyMap[countryCode];

      await AsyncStorageUtils.storeItemKey(
        AsyncStorageUtils.COUNTRY_CODE,
        countryCode
      );
      return countryCode;
    }
  }
};
