import moment from "moment";

const updateCurrentWeek = (date: moment.Moment) => {
  const selectedDate = moment(date);
  let days: any[] = [];
  let weekStart = selectedDate.clone().startOf("isoWeek");

  for (let i = 0; i <= 6; i++) {
    let dayDate = moment(weekStart).add(i, "days");
    let day = {
      day: dayDate.format("ddd"),
      date: dayDate.format("DD"),
      isTodayDate: dayDate.isSame(selectedDate, "day"), // Compare the day with selectedDate
      year: dayDate.format("YYYY"),
      month: dayDate.format("MMM"),
      time: dayDate.format("HH"),
      month_number: dayDate.format("MM"),
    };
    days.push(day);
  }
  return { days, selectedDate };
};

export default updateCurrentWeek;
