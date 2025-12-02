import {
  convertDaysToMonths,
  funtransformDataToKeyValueArray,
  separateFeatureActivities,
  calculateCombinedPercentages,
  transformData,
  completeWeekData,
  calculatePercentageScores,
  calculateActivitySubmissions,
} from "../src/screens/Dashboard/Wellness/helperFunctions";
import moment from "moment";

describe("Wellness helper functions", () => {
  describe("convertDaysToMonths", () => {
    it("returns '1 Day' when 0 days", () => {
      expect(convertDaysToMonths("0")).toBe("1 Day");
    });

    it("returns days when less than a month and non-zero", () => {
      expect(convertDaysToMonths("5")).toBe("5 Days");
      expect(convertDaysToMonths("29")).toBe("29 Days");
    });

    it("returns months when >= 30 days", () => {
      expect(convertDaysToMonths("30")).toBe("1 Months");
      expect(convertDaysToMonths("90")).toBe("3 Months");
    });
  });

  describe("funtransformDataToKeyValueArray", () => {
    it("transforms object into key-value array and converts durationOfPlan", () => {
      const input = { name: "Test", durationOfPlan: "60", activityFeedbackResponse: "skip" };
      const result = funtransformDataToKeyValueArray(input, ["activityFeedbackResponse", "goalProgress", "startDate"]);
      expect(result).toEqual(expect.arrayContaining([
        { title: "Test", desc: "name" },
        { title: "2 Months", desc: "durationOfPlan" },
      ]));
    });
  });

  describe("separateFeatureActivities", () => {
    it("separates items with and without completedTime", () => {
      const data = {
        "2023-01-01": [
          { id: 1 },
          { id: 2, completedTime: 10 },
        ],
      };
      const res = separateFeatureActivities(data);
      expect(res.data["2023-01-01"].isFeature).toHaveLength(1);
      expect(res.data["2023-01-01"].isNonFeature).toHaveLength(1);
    });
  });

  describe("calculateCombinedPercentages", () => {
    it("calculates percentages with feature and non-feature items", () => {
      const data = {
        "2023-01-01": {
          isFeature: [{ id: 1 }],
          isNonFeature: [{ totalTime: 10, completedTime: 5 }],
        },
      };
      const res = calculateCombinedPercentages(data);
      // expects one entry array with average percentage (100 and 50 => 75)
      expect(res).toEqual(expect.arrayContaining([{ "2023-01-01": 75 }]));
    });

    it("handles when there are no percentages gracefully", () => {
      const data = { "2023-01-02": { isFeature: [], isNonFeature: [] } };
      const res = calculateCombinedPercentages(data);
      expect(res).toEqual([{ "2023-01-02": NaN }]);
    });
  });

  describe("transformData", () => {
    it("converts data items to dates and values", () => {
      const input = [{ "2023-01-01": 10 }, { "2023-01-02": 20 }];
      const res = transformData(input);
      expect(res.dates).toEqual([moment("2023-01-01").format("ddd"), moment("2023-01-02").format("ddd")]);
      expect(res.value).toEqual([10, 20]);
    });
  });

  describe("completeWeekData", () => {
    it("creates 7 days when data is null", () => {
      const res = completeWeekData(null as any);
      expect(Array.isArray(res)).toBeTruthy();
      expect(res).toHaveLength(7);
    });

    it("pads data to 7 days when shorter", () => {
      const today = moment().format("YYYY-MM-DD");
      const input = [{ [today]: 10 }];
      const res = completeWeekData([...input]);
      expect(res.length).toBe(7);
      expect(Object.keys(res[0])[0]).toBe(today);
    });
  });

  describe("calculatePercentageScores", () => {
    it("calculates seven days of scores when submitted empty", () => {
      const data = { totalSubmission: 3, submitted: {} };
      const res = calculatePercentageScores(data as any);
      expect(Object.keys(res)).toHaveLength(7);
      Object.values(res).forEach((v) => expect(v).toBe(0));
    });
  });

  describe("calculateActivitySubmissions", () => {
    it("parses frequencyCount and groups activityHistory by date", () => {
      const activities = [
        {
          frequencyCount: "2 times",
          activityHistory: [
            { modifiedDate: "2023-01-01T10:00:00Z" },
            { modifiedDate: "2023-01-02T11:00:00Z" },
          ],
        },
      ];
      const res = calculateActivitySubmissions(activities as any);
      expect(res.totalSubmission).toBe(2);
      expect(Object.keys(res.submitted)).toContain("2023-01-01");
      expect(Object.keys(res.submitted)).toContain("2023-01-02");
    });
  });
});
