import moment from "moment";
import { AfternoonIcon, MorningIcon } from "../../../../../assets";

export const getActvityTitle = (index: any) => {
  if (index == 0) {
    return "Morning";
  } else if (index == 1) {
    return "Afternoon";
  } else if (index == 2) {
    return "Evening";
  }
};

export const getTitleIcon = (index: number) => {
  if (index === 1 || index === 2) {
    return <AfternoonIcon width={24} height={24} />;
  }
  return <MorningIcon width={24} height={24} />;
};

export const categorizeTasks = (activities: any[]) => {
  let data: any[] = activities;
  let tasks = data.flatMap((item: any) => {
    const statusArray = item.status ? JSON.parse(item.status) : null;
    return item.scheduleTime.map((time: any, index: number) => ({
      ...item,
      scheduleTime: time, // Set only one schedule time per object
      status: statusArray != null ? statusArray[index] : null,
      scheduleTimeArray: item.scheduleTime,
    }));
  });
  const categorized: any = {
    morning: [],
    afternoon: [],
    evening: [],
  };
  tasks?.forEach((task: any) => {
    const taskTime = moment(task?.scheduleTime, "hh:mm a");
    const morningStart = moment("05:00 am", "hh:mm a");
    const noon = moment("12:00 pm", "hh:mm a");
    const afternoonEnd = moment("06:00 pm", "hh:mm a");

    if (taskTime?.isBetween(morningStart, noon)) {
      categorized?.morning?.push(task);
    } else if (
      taskTime?.isBetween(noon, afternoonEnd) ||
      taskTime.isSameOrBefore(noon)
    ) {
      categorized?.afternoon?.push(task);
    } else {
      categorized?.evening?.push(task);
    }
  });

  return categorized;
};

export const multiSelectedByIndex = (data: any, index: any) => {
  const listData = [...data];
  const keyAble = listData[index].hasOwnProperty("isSelected");

  if (!keyAble) {
    listData[index].isSelected = true;
    return listData;
  } else {
    listData[index].isSelected = !listData[index].isSelected;
    return listData;
  }
};
export const singleSelectedByIndex = (data: any, index: any) => {
  const listData = [...data];
  let allFalse = listData.map((item: any) => {
    item.isSelected = false;
    return item;
  });

  if (allFalse[index] == undefined) return listData;
  allFalse[index].isSelected = true;
  return listData;
};

// export const singleSelectedByIndex = (data: any, index: number) => {
//   return data?.map((item:any, i:any) => ({
//     ...item,
//     isSelected: i === index,
//   }));
// };

// const createArray = (length: any) => {
//   return Array.from({ length }, () => ({ isShow: false }));
// };
// const [showDotClick, setShowDotClick] = useState(createArray(data?.length));
// const onPressRecommendation = (index: any) => {
//   let list = [...showDotClick];
//   list[index].isShow = !list[index]?.isShow;
//   setShowDotClick(list);
// };
