import { Pressable, StyleSheet, View } from "react-native";
import {
  Bin,
  BinSaltColor,
  EditorPen,
  ReplaceIcon,
  RecycleIcon_,
  EditPenOrange,
} from "../../../assets";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import moment from "moment";

type Item = {
  id: number;
  name: string;
  subject: string;
  text: string;
};
interface QuickActionsProps {
  item: Item;
  onEditClick: (item: any) => void;
  deleteItem: (item: Item) => void;
  onReplaceClick: (item: Item) => void;
  forIndependentGoals?: boolean;
}
export const QuickActions = ({
  item,
  onEditClick,
  deleteItem,
  onReplaceClick,
  forIndependentGoals = false,
}: QuickActionsProps) => {
  return (
    <View style={styles.qaContainer}>
      <Pressable
        style={[
          styles.button,

          {
            height: forIndependentGoals ? moderateScale(55) : "100%",
            top: forIndependentGoals ? moderateScale(15) : moderateScale(19),
            alignSelf: forIndependentGoals ? "flex-start" : "center",
            backgroundColor: "rgba(255, 157, 72, 0.15)",
          },
        ]}
        onPress={() => onEditClick(item)}
      >
        <Pressable onPress={() => onEditClick(item)}>
          <EditPenOrange />
        </Pressable>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: "rgba(78, 166, 146, .15)",
            height: forIndependentGoals ? moderateScale(55) : "100%",
            top: forIndependentGoals ? moderateScale(15) : moderateScale(19),
            alignSelf: forIndependentGoals ? "flex-start" : "center",
          },
        ]}
        onPress={() => onReplaceClick(item)}
      >
        <Pressable onPress={() => onReplaceClick(item)}>
          <RecycleIcon_ />
        </Pressable>
      </Pressable>

      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: "rgba(109, 89, 122, .15)",
            height: forIndependentGoals ? moderateScale(55) : "100%",
            top: forIndependentGoals ? moderateScale(15) : moderateScale(19),
            alignSelf: forIndependentGoals ? "flex-start" : "center",
          },
        ]}
        onPress={() => deleteItem(item)}
      >
        <Pressable style={{ padding: 10 }} onPress={() => deleteItem(item)}>
          <BinSaltColor />
        </Pressable>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    height: "100%",
    alignSelf: "center",
    top: moderateScale(19),
    backgroundColor: colors.green02,
    margin: 1,
    borderRadius: moderateScale(15),
  },
  qaContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export const transformDataForEditReplace = (
  data: any[],
  ActivityDetails: any
) => {
  console.log("transformDataForEditReplace data", data, ActivityDetails);

  // Helper to extract number from string (e.g., "1 time" -> 1)
  const extractNumber = (str: string) => {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0]) : null;
  };

  return data.map((item) => {
    let newItem = { ...item };

    // Set schedule time options
    if (newItem.fieldName === "ScheduleTime") {
      newItem.options = ActivityDetails?.scheduleTimeArray || [];
    }

    // Process options into proper format with selection handling
    if (Array.isArray(newItem.options)) {
      newItem.options = newItem.options.map((option: string) => {
        let isSelected = false;

        switch (newItem.fieldName) {
          case "Frequency":
            isSelected = option === ActivityDetails?.frequency;
            break;

          case "FrequencyCount":
            const optionCount = extractNumber(option);
            const activityCount = extractNumber(
              ActivityDetails?.frequencyCount
            );
            isSelected = optionCount === activityCount;
            break;

          case "ScheduleTime":
            isSelected = option === ActivityDetails?.scheduleTime;
            break;
        }

        return {
          optionValue: option,
          isSelected,
        };
      });
    }

    return newItem;
  });
};

export const transformDataForEditReplace1 = (
  data: any[],
  ActivityDetails: any,
  frequency: any[]
) => {
  console.log(
    "transformDataForEditReplace data",
    data,
    ActivityDetails,
    frequency
  );

  return data.map((item) => {
    let newItem = { ...item };

    // If fieldType is SingleSelect, extract the selected option value
    if (
      newItem.fieldType === "SingleSelect" &&
      Array.isArray(newItem.options)
    ) {
      const selectedOption = newItem.options.find(
        (option: any) => option.isSelected
      );
      newItem.selectedValue = selectedOption ? selectedOption.optionValue : "";
    }

    // If fieldName is "ScheduleTime", update options dynamically
    if (newItem.fieldName === "ScheduleTime") {
      const selectedFrequency =
        frequency.find((opt: any) => opt.isSelected)?.optionValue || "1 time";
      const frequencyCount = parseInt(selectedFrequency.split(" ")[0], 10) || 1;

      // Generate the schedule time options based on frequency count
      newItem.options = Array.from({ length: frequencyCount }, (_, i) => ({
        optionValue: ActivityDetails?.scheduleTimeArray[i] || "",
        isSelected: false,
      }));
    }
    return newItem;
  });
};

export const updateScheduleTime = (
  data: any[],
  mainQuestionIndex: number,
  index: number,
  value: string
) => {
  console.log("updateScheduleTime data", data, mainQuestionIndex, index, value);
  return data.map((item, i) => {
    if (i === mainQuestionIndex && item.fieldName === "ScheduleTime") {
      console.log("updateScheduleTime item", item, i);
      return {
        ...item,
        options: item.options.map((option: any, optionIndex: number) =>
          optionIndex === index ? { ...option, optionValue: value } : option
        ),
      };
    }

    return item;
  });
};

export const updateScheduleTimeOptions = (
  data: any[],
  ActivityDetails: any,
  selectedSlot?: any[]
) => {
  return data.map((item) => {
    if (item.fieldName === "ScheduleTime") {
      // Extract the selected frequency count (e.g., "3 times" → 3)
      const selectedFrequency =
        data
          .find((itm: any) => itm.fieldName === "FrequencyCount") // Correct fieldName
          ?.options.find((opt: any) => opt.isSelected)?.optionValue || "1 time";

      const frequencyCount = parseInt(selectedFrequency.split(" ")[0], 10) || 1;

      // Ensure scheduleTimeArray exists
      const scheduleTimeArray = ActivityDetails.scheduleTimeArray;
      console.log(
        "ActivityDetails.scheduleTimeArray",
        ActivityDetails.scheduleTimeArray
      );

      // Create new options based on frequency count
      const updatedOptions = Array.from({ length: frequencyCount }, (_, i) => ({
        optionValue: scheduleTimeArray[i] || scheduleTimeArray[0], // First value from array, others are empty
        isSelected: false,
      }));

      return { ...item, options: updatedOptions };
    }
    return item; // Keep other items unchanged
  });
};

export const checkAvailability = (
  bookedSlots: string[][],
  pickedTimes: string[],
  activityDuration: string
) => {
  const durationMinutes = parseInt(activityDuration); // e.g., "20 Minutes" → 20

  const toMinutes = (timeStr) => {
    const [time, meridian] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (meridian === "PM" && hours !== 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const toTimeStr = (minutes) => {
    let hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const meridian = hours >= 12 ? "PM" : "AM";
    if (hours === 0) hours = 12;
    else if (hours > 12) hours -= 12;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )} ${meridian}`;
  };

  const bookedInMinutes = bookedSlots.map(([start, end]) => [
    toMinutes(start),
    toMinutes(end),
  ]);

  return pickedTimes.map((pick) => {
    const startMin = toMinutes(pick);
    const endMin = startMin + durationMinutes;

    const hasConflict = bookedInMinutes.some(([bStart, bEnd]) => {
      return !(endMin <= bStart || startMin >= bEnd); // Check for any overlap
    });

    return {
      start: pick,
      end: toTimeStr(endMin),
      available: !hasConflict,
    };
  });
};

export function validateTimeSlotGaps(timeArray: string[], minGapText: string) {
  const minGap = parseInt(minGapText); // extract number of minutes from string
  const momentTimes = timeArray.map((time) => moment(time, "hh:mm A"));

  for (let i = 0; i < momentTimes.length - 1; i++) {
    const gap = Math.abs(momentTimes[i + 1].diff(momentTimes[i], "minutes"));
    if (gap < minGap) {
      return true;
    }
  }

  return false;
}

export type SingleSelectOption = {
  optionValue: string;
  isSelected: boolean;
};

export interface BaseField {
  id: number;
  question: string;
  fieldName: string;
}

export interface SingleSelectField extends BaseField {
  fieldType: "SingleSelect";
  options: SingleSelectOption[];
}

export interface TimePickerField extends BaseField {
  fieldType: "TimePicker";
  options: { optionValue: string; isSelected: boolean }[]; // same shape, but we ignore isSelected
}

export interface TextAreaField extends BaseField {
  fieldType: "TextArea";
  otherAnswer?: string;
}

export type Field = SingleSelectField | TimePickerField | TextAreaField;

export function extractAnswers(
  fields: Field[]
): Record<string, string | string[]> {
  return fields.reduce<Record<string, string | string[]>>((acc, field) => {
    switch (field.fieldType) {
      case "SingleSelect": {
        const selected = field.options.find((o) => o.isSelected);
        if (selected) acc[field.fieldName] = selected.optionValue;
        break;
      }

      case "TimePicker": {
        acc[field.fieldName] = field.options.map((o) => o.optionValue);
        break;
      }

      case "TextArea": {
        if (field.otherAnswer !== undefined)
          acc[field.fieldName] = `${extractNumber(field.otherAnswer) * 5}`;
        break;
      }
    }
    return acc;
  }, {});
}

export type ExtractedData = {
  Frequency: string; // e.g. "Daily"
  FrequencyCount: string; // e.g. "3 times"
  Duration: string; // e.g. "7"
  ScheduleTime: string[]; // e.g. ["03:21 AM", "04:36 AM", …]
};

export interface ActivityData {
  frequency: string; // "Daily"
  frequencyCount: string; // "3 times"
  duration: string; // "35 min"
  scheduleTime?: string[] | string; // could be array or single
  scheduleTimeArray?: string[]; // alternate array prop
  // …other fields ignored
}

/** Extract first integer from a string */
const extractNumber = (s: string) => parseInt(s.match(/\d+/)?.[0] ?? "", 10);

/**
 * Returns the array of schedule times found in activityData.
 * Checks:  scheduleTimeArray  →  scheduleTime (if Array)  →  [scheduleTime]
 */
const getActivityTimes = (activity: ActivityData): string[] => {
  if (
    Array.isArray(activity.scheduleTimeArray) &&
    activity.scheduleTimeArray.length
  )
    return activity.scheduleTimeArray;

  if (Array.isArray(activity.scheduleTime) && activity.scheduleTime.length)
    return activity.scheduleTime;

  if (typeof activity.scheduleTime === "string" && activity.scheduleTime)
    return [activity.scheduleTime];

  return []; // none present
};

export function compareExtractedWithActivity(
  extracted: ExtractedData,
  activity: ActivityData
) {
  const results = {
    Frequency:
      extracted.Frequency.toLowerCase() === activity.frequency.toLowerCase(),

    FrequencyCount:
      extractNumber(extracted.FrequencyCount) ===
      extractNumber(activity.frequencyCount),

    Duration:
      extractNumber(extracted.Duration) === extractNumber(activity.duration),

    ScheduleTime: (() => {
      const extTimes = extracted.ScheduleTime;
      const actTimes = getActivityTimes(activity);

      return (
        extTimes.length === actTimes.length &&
        extTimes.every((t) => actTimes.includes(t))
      );
    })(),
  };

  return results;
}

//sample
/* ──────────────────────────────────────────────────────────
   utils/validateActivityChanges.ts
─────────────────────────────────────────────────────────── */

export interface ActivityDetails {
  scheduleTime?: string | string[];
  scheduleTimeArray?: string[];
  duration: string; // "15 min"
  frequency: string; // "Daily"
  frequencyCount: string; // "3 times"
  // …other fields not used for validation
}

// export interface ExtractedData {
//   Frequency: string;
//   FrequencyCount: string;
//   Duration: string; // numeric string (e.g. "15")
//   ScheduleTime: string[]; // array of "hh:mm AM/PM"
// }

export type ChangeType = "Time" | "Duration" | "None" | "Frequency";

type WindowNum = { start: number; end: number };
type WindowStr = { start: string; end: string };

/** 0‑1439 ➝ "HH:MM AM/PM" */
const toClock = (minSinceMidnight: number): string => {
  const h24 = Math.floor(minSinceMidnight / 60) % 24;
  const m = minSinceMidnight % 60;

  const meridiem = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;

  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(h12)}:${pad(m)} ${meridiem}`;
};
export const numToClockWindows = (arr: WindowNum[]): WindowStr[] =>
  arr.map((w) => ({
    start: toClock(w.start),
    end: toClock(w.end),
  }));

type Window = { start: number; end: number };

export function diffFromSecond(a: Window[], b: Window[]): Window[] {
  const key = ({ start, end }: Window) => `${start}-${end}`;
  const setA = new Set(a.map(key));

  return b.filter((w) => !setA.has(key(w)));
}
export interface ValidationResult {
  changeType: ChangeType;
  isValid: boolean;
  reason?: string; // why it failed
  data?: any;
  typeOfError?: string;
}

/* ──────────────────────────────────────────────────────────
   Helper functions
─────────────────────────────────────────────────────────── */

/** Convert "08:00 AM" to minutes since midnight */
const toMinutes = (t: string) => {
  const [time, meridiem] = t.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (meridiem.toUpperCase() === "PM" && h !== 12) h += 12;
  if (meridiem.toUpperCase() === "AM" && h === 12) h = 0;
  return h * 60 + m;
};

const getOldTimes = (act: ActivityDetails): string[] => {
  const isScheduleTimeArray = Array.isArray(act?.scheduleTime);

  return isScheduleTimeArray
    ? (act?.scheduleTime as string[]) || []
    : act?.scheduleTimeArray || [];
};

/* ──────────────────────────────────────────────────────────
   Main validator
─────────────────────────────────────────────────────────── */

/**
 * Detects whether the user changed the schedule times or duration,
 * then applies the rules:
 *   • If times changed → create (start, end) windows and compare
 *   • If duration changed → compare (extracted × 5) against activity duratio\[n
 *
 * @returns {ValidationResult}
 */
type TimeRange = {
  start: number;
  end: number;
};

function hasDuplicateValuesInKeys(data: TimeRange[]): boolean {
  const startSet = new Set<number>();
  const endSet = new Set<number>();

  for (const item of data) {
    if (startSet.has(item.start) || endSet.has(item.end)) {
      return true; // Duplicate found in either start or end
    }
    startSet.add(item.start);
    endSet.add(item.end);
  }

  return false; // No duplicates in keys
}

export function validateActivityChanges(
  extracted: ExtractedData,
  activity: ActivityDetails
): ValidationResult {
  /* ========= DETECT WHAT CHANGED ========= */
  console.log("validateActivityChanges", { extracted, activity });
  const isScheduleTimeArray = Array.isArray(activity?.scheduleTime);
  const oldTimes = getOldTimes(activity);
  // const oldTimes = ;
  const frequencyIncreased: boolean =
    parseInt(extracted.FrequencyCount.match(/\d+/)?.[0] ?? "", 10) >
    parseInt(activity.frequencyCount.match(/\d+/)?.[0] ?? "", 10);
  const timesEqual =
    extracted.ScheduleTime.length === oldTimes.length &&
    extracted.ScheduleTime.every((t) => oldTimes.includes(t));

  const oldDurationNum = parseInt(
    activity.duration.match(/\d+/)?.[0] ?? "",
    10
  );
  const newDurationNum = parseInt(extracted.Duration, 10); // already numeric
  const durationsEqual = oldDurationNum === newDurationNum;

  let changeType: ChangeType = "None";
  if (!timesEqual) changeType = "Time";
  else if (!durationsEqual) changeType = "Duration";
  else if (frequencyIncreased) changeType = "Frequency";

  /* ========= VALIDATION RULES ========= */
  if (changeType === "Time" || changeType === "Frequency") {
    // Build windows: [t, t+duration] for OLD and NEW, compare overlap
    const durationMin = oldDurationNum; // duration stays same (rule says only time changed)
    const toWindow = (arr: string[]) =>
      arr.map((t) => ({
        start: toMinutes(t),
        end: toMinutes(t) + durationMin,
      }));

    const oldWindows = toWindow(oldTimes);
    const newWindows = toWindow(extracted.ScheduleTime);
    let allConditionSatisfied: boolean = false;
    let typeOfError: string = "";
    // valid if every new window matches an old one (order‑insensitive)
    const isNewWindowLengthIncreased = newWindows.length > oldWindows.length;
    const isNewWidowValidate_hasDuplicateValuesInKeys =
      hasDuplicateValuesInKeys(newWindows);
    const allMatch = newWindows.every((nw) =>
      oldWindows.some((ow) => ow.start === nw.start && ow.end === nw.end)
    );
    const diff = diffFromSecond(oldWindows, newWindows);
    const numToClockWindows_rws = numToClockWindows(diff);
    allConditionSatisfied =
      !isNewWindowLengthIncreased &&
      !isNewWidowValidate_hasDuplicateValuesInKeys &&
      allMatch;
    console.log("adjusted_newDurationNum", {
      extracted,
      allMatch,
      newWindows,
      oldWindows,
      diff,
      numToClockWindows_rws,
      isNewWidowValidate_hasDuplicateValuesInKeys,
      isNewWindowLengthIncreased,
      allConditionSatisfied,
    });

    return {
      changeType: "Time",
      isValid: allConditionSatisfied,
      reason: allConditionSatisfied
        ? undefined
        : "New times do not match original windows",
      data: numToClockWindows_rws,
      typeOfError: "",
    };
  }

  if (changeType === "Duration") {
    const durationMin = oldDurationNum; // duration stays same (rule says only time changed)
    const toWindowOld = (arr: string[]) =>
      arr.map((t) => ({
        start: toMinutes(t),
        end: toMinutes(t) + durationMin,
      }));
    const toWindowNew = (arr: string[]) =>
      arr.map((t) => ({
        start: toMinutes(t),
        end: toMinutes(t) + newDurationNum,
      }));
    const oldWindows = toWindowOld(oldTimes);
    const newWindows = toWindowNew(extracted.ScheduleTime);
    const diff = diffFromSecond(oldWindows, newWindows);
    const numToClockWindows_rws = numToClockWindows(diff);
    // multiply extracted duration by 5 before compare
    const adjusted = newDurationNum;
    const isValid = adjusted > oldDurationNum;
    console.log("adjusted_newDurationNum", {
      adjusted,
      oldDurationNum,
      isValid,
      parseDuration: parseInt(extracted.Duration, 10),
      extractedDuration: extracted.Duration,
      oldDuration: activity.duration,
      extracted,
      numToClockWindows_rws,
    });
    return {
      changeType: "Duration",
      isValid,
      reason: isValid
        ? `Duration (${adjusted} min) exceeds previous (${oldDurationNum} min)`
        : undefined,
      data: numToClockWindows_rws,
      // extracted,
    };
  }

  // nothing changed
  return { changeType: "None", isValid: true };
}
