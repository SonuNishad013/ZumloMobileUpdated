export const arrange = (base: any[]) => {
  let sortedActivities = base?.sort((a: any, b: any) => {
    let timeA: any = new Date("1970/01/01 " + a?.scheduleTime);
    let timeB: any = new Date("1970/01/01 " + b?.scheduleTime);

    return timeA - timeB;
  });
  return sortedActivities;
};

export const arrangeGoals = (data: any[]) => {
  const sortedGoals = data.sort((a, b) => {
    const durationA: any =
      (new Date(a.endDate) - new Date(a.startDate)) / (1000 * 60 * 60 * 24);
    const durationB: any =
      (new Date(b.endDate) - new Date(b.startDate)) / (1000 * 60 * 60 * 24);

    return durationA - durationB;
  });
  return sortedGoals;
};
