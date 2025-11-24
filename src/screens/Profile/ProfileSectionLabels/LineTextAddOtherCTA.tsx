export const getLineHeaderByStepName = (stepName: string, itemsData?: any) => {
  switch (stepName) {
    //--------------Physical Health's Personal Section start --------------------//
    case "Allergy Severity":
      return {
        textAboveLine: "How severe is your reaction?",
        CTAForOther: "",
      };
    case "Chronic Conditions":
      return {
        textAboveLine: "What condition did they experience?",
        CTAForOther: "Add another condition",
      };
    case "Date":
      return {
        textAboveLine: "",
        CTAForOther: "Select date of visit",
      };
    //--------------Physical Health's Personal Section end--------------------//
    //--------------Physical Health's Family medical histor Section start--------------------//
    case "Family Member":
      return {
        textAboveLine: "Who is this about?",
        CTAForOther: "Add another ",
      };
    case "Medical condition in family member.":
      return {
        textAboveLine: "What condition did they experience?",
        CTAForOther: "Add another condition",
      };
    case "Reason for Visit":
      return {
        textAboveLine: "",
        CTAForOther: "Add your own reason",
      };
    //--------------Physical Health's Family medical histor Section end--------------------//
    //--------------Mental Health's FPersonal Mental histor Section start--------------------//

    case "Existing Diagnosis":
      return {
        textAboveLine: "Diagnoses you've experienced (Select all that apply):",
        CTAForOther: "Something else",
      };
    case "Date of Diagnosis":
      return {
        textAboveLine: "When was your diagnosis?",
        CTAForOther: "",
      };
    case "Recent Health Assessments":
      return {
        textAboveLine: "Recent evaluations",
        CTAForOther: "",
      };
    case "Anxiety Levels":
      return {
        textAboveLine:
          "Anxiety Levels\n(1 = calm & centered, 10 = highly anxious)",
        CTAForOther: "",
      };
    case "Stress Levels":
      return {
        textAboveLine:
          "Stress Levels\n(1 = relaxed, 10 = constant stress or burnout)",
        CTAForOther: "",
      };
    case "Other Mental Health Conditions":
      return {
        textAboveLine: "Anything else you’d like to share? ",
        CTAForOther: "",
      };
    case "Depression Symptoms":
      return {
        textAboveLine: "Have you experienced any of the following recently?",
        CTAForOther: "Add another symptom",
      };
    case "Mood":
      return {
        textAboveLine: "Mood Check-in\nHow would you describe your mood today?",
        CTAForOther: "",
      };
    case "Thought Processes":
      return {
        textAboveLine: "Describe how your thoughts tend to flow ?",
        CTAForOther: "",
      };
    case "Focus Levels":
      return {
        textAboveLine:
          "How would you rate your focus lately?\n1 = Easily distracted\n10 = Highly focused and steady ",
        CTAForOther: "",
      };
    case "Cognitive Distortions":
      return {
        textAboveLine: "Have you noticed any of these thinking patterns?",
        CTAForOther: "Add your own ",
      };
    case "Frequency":
      return {
        textAboveLine:
          itemsData?.categoryName === "Current Counseling"
            ? "How often do you attend sessions?"
            : "Frequency",
        CTAForOther: "",
      };
    case "Type of Therapy":
      return {
        textAboveLine: "",
        CTAForOther: "Add your own",
      };
    case "Any Progress":
      return {
        textAboveLine: "Any progress or changes you've noticed?",
        CTAForOther: "",
      };
    case "":
      return {
        textAboveLine: "",
        CTAForOther: "",
      };
    case "Therapist Name":
      return {
        textAboveLine: "Provider's name",
        CTAForOther: "",
      };
    case "":
      return {
        textAboveLine: "",
        CTAForOther: "",
      };
    case "Positive Coping Strategies":
      return {
        textAboveLine: "What helps you feel better? ",
        CTAForOther: "Add your own",
      };
    case "Negative Coping Strategies":
      return {
        textAboveLine: "What might not be serving you?",
        CTAForOther: "Add your own",
      };
    case "Specific Stressor Details":
      return {
        textAboveLine: "What specific situations tend to cause stress?",
        CTAForOther: "",
      };
    case "Frequency of Stress":
      return {
        textAboveLine: "How often do you experience stress?",
        CTAForOther: "",
      };
    case "Impact of Stress":
      return {
        textAboveLine: "How does stress tend to affect you? ",
        CTAForOther: "",
      };
    case "Effectiveness of Stress Management Techniques":
      return {
        textAboveLine: "How well do your current strategies work for you?",
        CTAForOther: "",
      };
    case "Typical Mood Fluctuations":
      return {
        textAboveLine: "How do your moods usually shift or cycle? ",
        CTAForOther: "",
      };
    case "Mood Triggers":
      return {
        textAboveLine: "What tends to affect your mood?",
        CTAForOther: "",
      };
    case "Mood Management Techniques":
      return {
        textAboveLine: "What tends to affect your mood?",
        CTAForOther: "",
      };

    case "Introvert vs. Extrovert":
      return {
        textAboveLine: "Where do you tend to draw your energy from?",
        CTAForOther: "",
      };
    case "Sensitivity to Criticism":
      return {
        textAboveLine:
          "How strongly do you react to feedback or criticism?\n1 = I stay unaffected\n10 = I take it very personally",
        CTAForOther: "",
      };
    case "Resilience and Adaptability":
      return {
        textAboveLine:
          "How easily do you adjust when things don’t go as planned?\n1 = I struggle to adapt\n10 = I adjust quickly and move on",
        CTAForOther: "",
      };
    case "Preference for Structured vs. Unstructured Activities":
      return {
        textAboveLine:
          "Do you prefer structured routines or more flexible, spontaneous days?\n1 = I thrive on structure\n10 = I prefer going with the flow ",
        CTAForOther: "",
      };

    case "Habits":
      return {
        textAboveLine: "Your go-to behaviors—good or not-so-good",
        CTAForOther: "",
      };
    case "Routines":
      return {
        textAboveLine: "What your day usually looks like?",
        CTAForOther: "",
      };
    case "Behavioral Triggers":
      return {
        textAboveLine: "What tends to lead to those habits? ",
        CTAForOther: "Add your own ",
      };
    case "What are your preferred types of exercises?":
      return {
        textAboveLine:
          "What types of movement do you enjoy? Choose as many as you’d like?",
        CTAForOther: "Add your own",
      };
    case "What are your favorite leisure activities?":
      return {
        textAboveLine: "How do you like to unwind or recharge?",
        CTAForOther: "Add your own",
      };
    case "What has been your experience with meditation?":
      return {
        textAboveLine: "What has your experience with meditation been like?",
        CTAForOther: "",
      };
    case "What are your preferred meditation techniques?":
      return {
        textAboveLine: "What types of meditation do you enjoy or want to try?",
        CTAForOther: "",
      };
    case "What are your interests in mental health education?":
      return {
        textAboveLine:
          "Mental health education\nWhat are your interests in mental health education?\nChoose the formats that speak to you most.",
        CTAForOther: "",
      };
    case "How do you engage with self-help resources?":
      return {
        textAboveLine:
          "Self-help engagement\nHow do you engage with self-help resources?\nPick the tools or communities that help you feel supported.",
        CTAForOther: "",
      };
    case "What are your goals for personal growth and development?":
      return {
        textAboveLine:
          "Growth goals \nWhat are your goals for personal growth and development?\nShare what you'd love to work on or where you'd like to go next.",
        CTAForOther: "",
      };

    case "What is your preferred communication channel?":
      return {
        textAboveLine: "What communication channels do you prefer?",
        CTAForOther: "",
      };
    case "What is your preferred communication style?":
      return {
        textAboveLine: "Which communication style feels right for you? ",
        CTAForOther: "",
      };
    case "Comfort Level with Technology":
      return {
        textAboveLine: "What's your comfort level with technology? ",
        CTAForOther: "",
      };
    case "What types of educational content do you prefer?\r\n\r\n":
      return {
        textAboveLine: "What educational content do you prefer?",
        CTAForOther: "",
      };
    case "What is your preferred learning style?":
      return {
        textAboveLine: "What learning style suits you best?",
        CTAForOther: "",
      };
    case "What style of instruction or advice do you prefer?":
      return {
        textAboveLine: "What's your preferred guidance style?",
        CTAForOther: "",
      };
    case "What specific accessibility needs do you have?":
      return {
        textAboveLine: "Which accessibility areas apply to you?",
        CTAForOther: "",
      };
    case "Specific Requirements":
      return {
        textAboveLine: "Any specific requirements or notes?",
        CTAForOther: "",
      };
    case "How important are usability features to you?":
      return {
        textAboveLine: "Which usability features matter most to you?",
        CTAForOther: "",
      };
    case "What is your preferred color scheme for the app?":
      return {
        textAboveLine: "What's your preferred color scheme for the app?",
        CTAForOther: "",
      };
    case "Additional Comments or Preferences":
      return {
        textAboveLine: "Your comments",
        CTAForOther: "",
      };
    case "":
      return {
        textAboveLine: "",
        CTAForOther: "",
      };
    case "":
      return {
        textAboveLine: "",
        CTAForOther: "",
      };
    case "":
      return {
        textAboveLine: "",
        CTAForOther: "",
      };
    case "":
      return {
        textAboveLine: "",
        CTAForOther: "",
      };
    case "":
      return {
        textAboveLine: "",
        CTAForOther: "",
      };
    case "":
      return {
        textAboveLine: "",
        CTAForOther: "",
      };
    case "":
      return {
        textAboveLine: "",
        CTAForOther: "",
      };
    case "":
      return {
        textAboveLine: "",
        CTAForOther: "",
      };
    case "":
      return {
        textAboveLine: "",
        CTAForOther: "",
      };
    default:
      return { textAboveLine: "", CTAForOther: "" };
  }
};
