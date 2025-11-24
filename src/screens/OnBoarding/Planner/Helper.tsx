import { imagePath } from "../../../assets/png/imagePath";
import colors from "../../../constant/colors";

export const screenwrapperColor = (idx: any) => {
  switch (idx) {
    case 0:
      return "#B29ABE";
    case 1:
      return "#B29ABE";
    case 2:
      return "#36809C";
    case 3:
      return "#6D597A";
    case 4:
      return colors?.polishedPine;
    case 5:
      return colors?.prussianBlue;
    case 6:
      return "#B29ABE";
    default:
      break;
  }
};
export const screenImageBackground = (idx: any) => {
  switch (idx) {
    case 0:
      return imagePath?.BGSaltBox;
    case 1:
      return imagePath?.BGSaltBox;
    case 2:
      return imagePath?.PhysicalHealthBackground;
    case 3:
      return imagePath?.BGSaltFlow;
    case 4:
      return imagePath?.BGPolishedPine;
    case 5:
      return imagePath?.MoonBG;
    case 6:
      return imagePath?.BGSaltIcon;
    default:
      break;
  }
};
export const filterData = (onBoardingSteps: any, question: any) => {
  const list = onBoardingSteps.filter((itm: any) => {
    if (itm?.stepNumber == question) {
      return itm;
    }
  });
  if (list.length > 0) {
    return list[0];
  }
};
