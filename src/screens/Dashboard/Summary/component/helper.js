import { imagePath } from "../../../../assets/png/imagePath";
import { Enum_moodType } from "../../../../constant/ENUM";

export function getRatingEnum(value) {
  switch (true) {
    case value >= 0 && value < 20:
      return 1; // VeryPoor
    case value >= 20 && value < 40:
      return 2; // Poor
    case value >= 40 && value < 60:
      return 3; // Average
    case value >= 60 && value < 80:
      return 4; // Good
    case value >= 80 && value <= 100:
      return 5; // Excellent
    default:
      throw new Error("Invalid value. Must be between 0 and 100.");
  }
}

export const getMoodIconsByMoodType = (moodType) => {
  switch (moodType) {
    case Enum_moodType?.Feeling_down:
      return imagePath?.VeryPoor;
    case Enum_moodType?.Feeling_low:
      return imagePath?.Poor;
    case Enum_moodType?.Neutral:
      return imagePath?.NautralEmojie;
    case Enum_moodType?.Feeling_happy:
      return imagePath?.Fair;
    case Enum_moodType?.Feeling_extremely_joyful:
      return imagePath?.Excellent;
    default:
      return imagePath?.NautralEmojie;
  }
};
