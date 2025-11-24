import { Platform } from "react-native";

export const fontFamilies = {
  THIN: Platform?.OS == "android" ? "poppins_thin" : "Poppins-Thin",
  REGULAR: Platform?.OS == "android" ? "poppins-regular" : "Poppins-Regular",
  MEDIUM: Platform?.OS == "android" ? "poppins_medium" : "Poppins-Medium",
  BOLD: Platform?.OS == "android" ? "poppins_bold" : "Poppins-Bold",
  EXTRA_BOLD:
    Platform?.OS == "android" ? "poppins_extrabold" : "Poppins-ExtraBold",
  ITALIC: Platform?.OS == "android" ? "poppins_italic" : "Poppins-Italic",
};
