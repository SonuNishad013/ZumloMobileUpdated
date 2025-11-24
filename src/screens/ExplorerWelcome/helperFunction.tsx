import moment from "moment";

export const processGoals = (goals: any[]) => {
  const result: any[] = [];

  goals?.forEach((goal: any) => {
    const goalData: any = {
      title: goal.title,
      description: goal.description,
      Activities: [],
      GoalsProgress: {
        totalSubmition: 0,
        currentSubmition: 0,
      },
    };

    let totalGoalSubmissions = 0;
    let totalGoalCurrentSubmissions = 0;

    goal.activities.forEach((activity: any) => {
      const createdDate = moment(goal.startDate);
      const completionDate = moment(goal.endDate);
      const activitiesTotalDays = Math.abs(
        completionDate.diff(createdDate, "days")
      );
      const frequencyCount = parseInt(activity.frequencyCount.split(" ")[0]);
      const totalSubmition = Math.abs(activitiesTotalDays * frequencyCount);
      const currentSubmition = activity.activityHistory?.length || 0;

      totalGoalSubmissions += totalSubmition;
      totalGoalCurrentSubmissions += currentSubmition;

      goalData.Activities.push({
        activitiesTotalDays,
        frequencyCount,
        TotalSubmition: Math.abs(totalSubmition),
        currentSubmition,
      });
    });

    goalData.GoalsProgress.totalSubmition = Math.abs(totalGoalSubmissions);
    goalData.GoalsProgress.currentSubmition = Math.abs(
      totalGoalCurrentSubmissions
    );
    result.push(goalData);
  });

  return result;
};

export const getBtnName = (data: any) => {
  switch (data?.codeName) {
    case "Mood Tracking":
      return "Set current mood";
    case "Setting Goals":
      return "Set your goal";
    case "Relaxation Activities":
      return "Show me how";
    case "Wellness Plan":
      return "Let’s go";
    case "Quiz":
      return "Take the Quiz";
    case "Questionnaire":
      return "Let’s do this";
    default:
      return "Proceed";
  }
};
