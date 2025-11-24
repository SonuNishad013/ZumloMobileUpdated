export const inputFields = ["Input", "TextArea", "TextAreaBox", "NumberSelect"]; // for input fields
export const isNumberKey = ["NumberSelect"]; // for  number fields only
export const isJSONkey = ["JsonText"]; // for  json fields only
export const isNotificationPreferencesQue = ["No Notifications", "None"]; // for  json fields only

export const selectableFields = [
  // for multi select
  "MultiSelectLine",
  "MultiSelectBox",
  "MultiSelect",
  "CircleSelect",
  "MoodSelect",
  "StretchMultiSelect",
  "BubbleSelect",
  "FrequencyCurve",
  "LevelSelect",
  "CircleMultiSelect",
  "StarMultiSelect",
  "FeelingSelect",
  "FrequencySelect",
  "BubbleBoxSelect",
  "MultiCardSelect",
  "ArrowSelect",
];
export const dateFields = ["DatePicker"];
export const TimeFields = ["TimePicker"];

export const sliderFields = ["Slider", "BubbleBoxSelect", "SimleSlider"];
export const singleSelectFields = [
  // for single select
  "SingleSelect",
  "StarSingleSelect",
  "SingleCheck",
  "SingleSelectBox",
  "SingleSelectLine",
  "StretchSingleSelect",
  "MinBoxSingleSelect",
  "CircleCurveSelect",
  "FrequencyCurve",
  "LevelSelect",
  "CircleCurveSelectSix",
  "MealSelect",
  "StarLevelSelect",
  "StarSingleSelect",
  "miniBoxSingleSelect",
  "SingleDropdown",
  "DescendingAscending",
  "ScaleSliderSelect",
  "Dropdown",
];
export const multiSelectableFields = new Set([...selectableFields]); // for set array of multi select
export const singleSelectableFields = new Set([...singleSelectFields]); // for set array of multi select
export const allContentType = [
  //all content types
  "SingleSelect",
  "StarSingleSelect",
  "SingleCheck",
  "SingleSelectBox",
  "SingleSelectLine",
  "StretchSingleSelect",
  "MinBoxSingleSelect",
  "CircleCurveSelect",
  "FrequencyCurve",
  "LevelSelect",
  "CircleCurveSelectSix",
  "MealSelect",
  "StarLevelSelect",
  "StarSingleSelect",
  "miniBoxSingleSelect",
  "Slider",
  "NumberSelect",
  "BubbleBoxSelect",
  "ScaleSliderSelect",
  "DatePicker",
  "MultiSelectLine",
  "MultiSelectBox",
  "MultiSelect",
  "CircleSelect",
  "MoodSelect",
  "StretchMultiSelect",
  "BubbleSelect",
  "FrequencyCurve",
  "LevelSelect",
  "CircleMultiSelect",
  "StarMultiSelect",
  "FeelingSelect",
  "Dropdown",
  "FrequencySelect",
  "NumberSelect",
  "BubbleBoxSelect",
  "MultiCardSelect",
  "ArrowSelect",
  "Input",
  "TextArea",
  "SingleDropdown",
  "SimleSlider",
  "DescendingAscending",
  "TimePicker",
  "TextAreaBox",
  "JsonText",
];
export const otherOptions = ["Other", "Add Your Specifications"]; // for other selection.
