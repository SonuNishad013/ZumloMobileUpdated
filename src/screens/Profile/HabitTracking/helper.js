import moment from "moment";

export const addHabitCategory = [
  { title: "Gardening", value: "Cat1" },
  { title: "Reading", value: "Cat2" },
  { title: "Exercise", value: "Cat3" },
  { title: "Meditation", value: "Cat4" },
  { title: "Other", value: "Cat5" },
];
export const addHabitDuration = [
  { title: "10 Mins", value: "Cat1" },
  { title: "20 Mins", value: "Cat2" },
  { title: "30 Mins", value: "Cat3" },
  { title: "40 Mins", value: "Cat4" },
];

// New array: 5 min to 60 min with 5 min gap
export const addHabitDuration5to60 = Array.from({ length: 12 }, (_, i) => {
  const min = (i + 1) * 5;
  return {
    title: `${min} Mins`,
    value: `Cat${i + 1}`,
  };
});
export const addHabitDuration_ = [{ title: "Other", value: "cat0" }].concat(
  addHabitDuration5to60
);
export const addHabitGoals = [
  { title: "Other", value: "Cat0" },
  { title: "10 Times", value: "Cat1" },
  { title: "20 Times", value: "Cat2" },
  { title: "30 Times", value: "Cat3" },
  { title: "40 Times", value: "Cat4" },
];

export const habitList = {
  data: [
    {
      habitId: 6,
      userId: 394,
      name: "Go for a walk",
      categories: ["Wellness", "test"],
      frequency: 2,
      daysOfWeek: [2, 4],
      currentStreak: 0,
      startDate: "2025-07-07T00:00:00",
      reminderTime: "10:00:00",
      duration: "30 min",
      goal: 10,
      habitStatus: 2,
      daysOfWeeks: [],
      habitTracking: [
        {
          habitStatus: 3,
          notes: "Saved the record",
          createdDate: "2025-07-08T12:33:26.3060768",
        },
      ],
    },
    {
      habitId: 7,
      userId: 394,
      name: "Reading a book at least 10 pages daily",
      categories: ["Reading"],
      frequency: 3,
      daysOfWeek: [4, 6],
      currentStreak: 0,
      startDate: "2025-07-09T06:21:31.029",
      reminderTime: "12:00:00",
      duration: "30 min",
      goal: 15,
      habitStatus: 2,
      daysOfWeeks: [],
      habitTracking: [],
    },
    {
      habitId: 8,
      userId: 394,
      name: "Watering to the plants",
      categories: ["Wellness", "test"],
      frequency: 1,
      daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
      currentStreak: 0,
      startDate: "2025-07-07T00:00:00",
      reminderTime: "14:00:00",
      duration: "45 min",
      goal: 300,
      habitStatus: 2,
      daysOfWeeks: [],
      habitTracking: [
        {
          habitStatus: 3,
          notes: "Saved the record",
          createdDate: "2025-07-08T12:33:26.3060768",
        },
      ],
    },
  ],
  statusCode: 200,
  message: "Records returned successfully.",
  success: true,
};

export const frequency_data = [
  {
    globalCodeId: 153,
    codeName: "Daily",
    imageURL:
      "https://zumlo-static-endpoint-eqf8checfjafduaw.z01.azurefd.net/static-files/Beginner_20241127074343.svg",
    description: "Beginner",
    isSelected: false,
  },
  {
    globalCodeId: 154,
    codeName: "Weekly",
    imageURL:
      "https://zumlo-static-endpoint-eqf8checfjafduaw.z01.azurefd.net/static-files/Intermediate_20241127074450.svg",
    description: "Intermediate",
    isSelected: false,
  },
  {
    globalCodeId: 155,
    codeName: "Specific days",
    imageURL:
      "https://zumlo-static-endpoint-eqf8checfjafduaw.z01.azurefd.net/static-files/Advanced_20241127074523.svg",
    description: "Advanced",
    isSelected: false,
  },
];

export const weekDays = [];
for (let i = 0; i < 7; i++) {
  weekDays.push({
    day: moment()
      .weekday(i + 1)
      .format("ddd"),
    isSelected: true,
  });
}
export const testIds = {
  MainCard: "mainCard",
  title_Duration: "titleDuration",
  NumberOfGoals_ViewButton: "NumberOfGoals_ViewButton",
};
