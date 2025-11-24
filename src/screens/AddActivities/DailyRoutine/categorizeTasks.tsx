import moment from "moment";
import logger from "../../../constant/logger";

function sortActivitiesByScheduleTime(activities: any) {
  return activities.sort((a: any, b: any) => {
    // Parse scheduleTime to a moment object with AM/PM format
    const timeA: any = moment(a.scheduleTime, "hh:mm A");
    const timeB: any = moment(b.scheduleTime, "hh:mm A");

    // Compare times in ascending order
    return timeA - timeB;
  });
}
const categorizeTasks = (tasks: any) => {
  logger("InvetigateDailyRoutineLog-2______", tasks);

  let modifiedData = tasks.flatMap((item: any) => {
    const statusArray = item.status ? JSON.parse(item.status) : [];

    return item.scheduleTime.map((time: string, index: number) => ({
      ...item,
      scheduleTime: time, // one time per object
      status: statusArray[index] ?? null, // take correct status
      scheduleTimeArray: item.scheduleTime, // keep full array if needed
    }));
  });

  if (!Array.isArray(modifiedData)) {
    console.error("Invalid tasks data:", modifiedData);
    return [
      { title: "Morning", data: [] },
      { title: "Afternoon", data: [] },
      { title: "Evening", data: [] },
      { title: "Night", data: [] },
    ];
  }

  let morningTasks: any[] = [];
  let afternoonTasks: any[] = [];
  let eveningTasks: any[] = [];
  let nightTasks: any[] = [];

  modifiedData.forEach((task: any) => {
    const taskTime = moment(task.scheduleTime, "hh:mm a");
    const noon = moment("12:00 pm", "hh:mm a");
    const eveningStart = moment("06:00 pm", "hh:mm a");
    const nightStart = moment("09:00 pm", "hh:mm a");

    if (taskTime.isBefore(noon)) {
      morningTasks.push(task);
    } else if (taskTime.isBefore(eveningStart)) {
      afternoonTasks.push(task);
    } else if (taskTime.isBefore(nightStart)) {
      eveningTasks.push(task);
    } else {
      nightTasks.push(task);
    }
  });

  return [
    { title: "Morning", data: sortActivitiesByScheduleTime(morningTasks) },
    { title: "Afternoon", data: sortActivitiesByScheduleTime(afternoonTasks) },
    { title: "Evening", data: sortActivitiesByScheduleTime(eveningTasks) },
    { title: "Night", data: sortActivitiesByScheduleTime(nightTasks) },
  ];
};

export default categorizeTasks;
