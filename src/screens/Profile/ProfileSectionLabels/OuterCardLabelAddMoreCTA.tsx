export const cardHeaderNameAddOtherCTAButtonText = (stepName: string) => {
  //Name for each cards goes here and Add more CTA button
  switch (stepName) {
    //--------------Physical Health's Personal Section start--------------------//
    case "Medical Conditions":
      return { headerText: "Health history", AddMoreCTA: "Add history" };
    case "Allergies":
      return { headerText: "Allergy info", AddMoreCTA: "Add allergy" };
    case "Recent Medical Visits":
      return { headerText: "Doctor visits", AddMoreCTA: "Add Visit" };
    case "Past Hospitalizations":
      return { headerText: "", AddMoreCTA: "Add hospitalization" };
    case "Past Surgeries":
      return { headerText: "", AddMoreCTA: "Add surgery" };
    //--------------Physical Health's Personal Section end--------------------//
    //--------------Mental Health's Personal Mental Health Section start--------------------//

    case "Personal Mental Health History":
      return { headerText: "Your mental health background", AddMoreCTA: "" };
    case "Family Mental Health History":
      return { headerText: "Mental health in your family", AddMoreCTA: "" };
    //--------------Mental Health's Personal Mental Health Section end--------------------//
    case "Current Medications":
      return { headerText: "Your active medications", AddMoreCTA: "Add Meds" };
    case "Past Medications":
      return { headerText: "Past prescriptions", AddMoreCTA: "Add Past Meds" };
    case "Medication Allergies or Side Effects":
      return {
        headerText: "Allergies or side effects from medication",
        AddMoreCTA: "Add Reactions",
      };
    case "Current Counseling":
      return { headerText: "Your counseling details", AddMoreCTA: "" };
    case "Counseling History":
      return {
        headerText: "Counseling history",
        AddMoreCTA: "Add past therapy",
      };
    case "Personality Traits":
      return { headerText: "How you naturally show up", AddMoreCTA: "" };
    case "Behavioral Patterns":
      return { headerText: "Patterns in your daily behavior", AddMoreCTA: "" };
    case "Coping Mechanism":
      return { headerText: "How you tend to cope", AddMoreCTA: "" };
    case "Thought Processes":
      return { headerText: "How your mind processes things", AddMoreCTA: "" };
    case "Mood Patterns":
      return { headerText: "Mood ups and downs", AddMoreCTA: "" };
    case "Emotional Well-Being":
      return { headerText: "Your emotional strengths", AddMoreCTA: "" };
    case "Emotional Regulation":
      return {
        headerText: "How you tend to respond emotionally",
        AddMoreCTA: "",
      };
    case "Stressors and Triggers":
      return { headerText: "What tends to weigh on you", AddMoreCTA: "" };
    case "Stress Levels":
      return { headerText: "How stress shows up for you", AddMoreCTA: "" };
    case "Additional Associated Fields for Context":
      return { headerText: "Extra context that could help", AddMoreCTA: "" };
    case "Preferred Therapy Methods":
      return { headerText: "Your favorite therapy approaches", AddMoreCTA: "" };
    case "Activity Preferrence":
      return { headerText: "Your preferred activities", AddMoreCTA: "" };
    case "Meditation Practices":
      return {
        headerText: "Your meditation preference & experience",
        AddMoreCTA: "",
      };
    case "Relaxation Methods":
      return { headerText: "Ways you relax", AddMoreCTA: "" };
    case "Mindfullness Activities":
      return { headerText: "Your mindfulness habits", AddMoreCTA: "" };
    case "Learning & Development":
      return { headerText: "Your growth & learning interests", AddMoreCTA: "" };
    case "Stress Management Techniques":
      return { headerText: "How you manage stress ", AddMoreCTA: "" };
    case "Holistics Health Practices":
      return { headerText: "Holistic practices you prefer ", AddMoreCTA: "" };
    //------------------------Technology and accessbility-----------------------//
    case "Preferred Devices":
      return { headerText: "Devices You Prefer", AddMoreCTA: "" };
    case "Preferred Communication Channels":
      return { headerText: "How You Like to Communicate", AddMoreCTA: "" };
    case "Preferred Communication Style":
      return { headerText: "Your Communication Style", AddMoreCTA: "" };
    case "Tech-Services":
      return { headerText: "Comfort Level with Technology", AddMoreCTA: "" };
    case "Content Preferences":
      return { headerText: "Favorite Types of Content", AddMoreCTA: "" };
    case "Preferred Learning Style":
      return { headerText: "Preferred Ways to Learn", AddMoreCTA: "" };
    case "Preferred Instructional":
      return { headerText: "Guidance & Advice Style", AddMoreCTA: "" };
    case "Accessibility Needs":
      return { headerText: "Your Accessibility Needs", AddMoreCTA: "" };
    case "Preferences for App Usability Features":
      return { headerText: "App Usability Preferences", AddMoreCTA: "" };
    case "Additional Comments or Preferences":
      return { headerText: "Anything Else We Should Know?", AddMoreCTA: "" };

    case "":
      return { headerText: "", AddMoreCTA: "" };

    default:
      return { headerText: "", AddMoreCTA: "" };
  }
};
