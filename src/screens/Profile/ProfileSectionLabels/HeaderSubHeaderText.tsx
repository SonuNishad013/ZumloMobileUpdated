import logger from "../../../constant/logger";

export const getMainHeaderByCategoryName = (
  categoryName: string,
  HedaerName?: string
) => {
  logger("HedaerName______", HedaerName);
  switch (categoryName) {
    //--------------Physical Health's Personal Section--------------------//
    case "Allergies":
      return {
        mainHeader: "Allergy Info",
        subHeader:
          "Sharing allergies helps us better personalize your care. Only add what you're comfortable with.",
        CTAButton: "Save my info",
      };
    case "Medical Conditions":
      return {
        mainHeader: "Medical Conditions",
        subHeader:
          "Let us know about any chronic conditions—only if you’re comfortable sharing.",
        CTAButton: "Save my info",
      };
    case "Recent Medical Visits":
      return {
        mainHeader: "",
        subHeader:
          "Track any doctor or clinic visits—sharing this helps us support you better.",
        CTAButton: "Save my info",
      };
    case "Past Hospitalizations":
      return {
        mainHeader: "",
        subHeader:
          "Add any hospital stays that might help us better understand your care history. Optional, and fully private.",
        CTAButton: "Save my info",
      };
    //--------------Physical Health's Personal Section--------------------//
    //--------------Physical Health's Family medical histor Section start--------------------//
    case "Family Medical History":
      return {
        mainHeader: "",
        subHeader:
          "You can share what feels relevant—everything here stays private",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    //--------------Physical Health's Family medical histor Section end--------------------//
    //--------------Menatl Health's Personal Mental health Section start--------------------//
    case "Personal Mental Health History":
      return {
        mainHeader: "Your mental health background",
        subHeader:
          "Your experiences matter—feel free to include what you’re comfortable sharing.",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };

    case "Family Mental Health History":
      return {
        mainHeader: "Family's Mental Wellness",
        subHeader:
          "Some mental health conditions can run in families. Knowing this helps us tailor support that actually fits you. (Only share what feels right—this is your space.) ",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "Current Medications":
      return {
        mainHeader: "",
        subHeader:
          "Track your current prescriptions so we can support you better. Optional, and kept private.",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "Medication Allergies or Side Effects":
      return {
        mainHeader: "",
        subHeader:
          "Let us know if you’ve had any allergic reactions or unwanted effects. It helps us personalize your care.",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "Past Medications":
      return {
        mainHeader: "",
        subHeader:
          "Record any medications you’ve used in the past—this helps us understand what worked and what didn’t.",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "Current Counseling":
      return {
        mainHeader: "",
        subHeader:
          "Log any ongoing therapy or counseling you're receiving—it helps us understand how you’re being supported.",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "Counseling History":
      return {
        mainHeader: "",
        subHeader:
          "Log any therapy you’ve tried in the past—only what feels relevant to share.",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "Emotional Well-Being":
      return {
        mainHeader: "",
        subHeader:
          "Gently check in on your emotional strengths—no pressure, just perspective.",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "Additional Associated Fields for Context":
      return {
        mainHeader: "Additional context on stress ",
        subHeader:
          HedaerName === "Personality Information"
            ? "Share how your strengths and weaknesses impact your life and what support might help."
            : "",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };

    case "":
      return {
        mainHeader: "",
        subHeader: "",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "Coping Mechanism":
      return {
        mainHeader: "",
        subHeader:
          "How do you usually cope with stress or tough moments? No judgment—just insight to better support you.",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "Thought Processes":
      return {
        mainHeader: "",
        subHeader:
          "Reflect on how your mind works—this helps us understand your thinking patterns more clearly.",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "Mood Patterns":
      return {
        mainHeader: "",
        subHeader:
          "Understand how your mood shifts and what supports you best—just share what feels helpful.",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "Personality Traits":
      return {
        mainHeader: "",
        subHeader:
          "There’s no right or wrong—just a better way to understand how you move through the world.",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "Behavioral Patterns":
      return {
        mainHeader: "",
        subHeader:
          "Reflect on your habits and what tends to trigger certain behaviors. This helps us understand what supports you best. ",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "Preferred Therapy Methods":
      return {
        mainHeader: "Your favorite therapy approaches",
        subHeader:
          "Choose the types of therapy that feel most helpful or interesting to you. You can select more than one.",
        // subHeader: "",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };

    case "Activity Preferrence":
      return {
        mainHeader: "Your preferred activities",
        subHeader:
          "Tell us what moves you—physically or mentally. This helps us suggest activities you’ll actually enjoy.",
        CTAButton: "Save my preferences",
        AddOtherCTA: "",
      };
    case "Meditation Practices":
      return {
        mainHeader: "Your meditation preference & experience ",
        subHeader:
          "Whether you're just exploring or already meditating—this helps us shape your journey. ",
        CTAButton: "Save my preferences",
        AddOtherCTA: "Add your own",
      };
    case "Relaxation Methods":
      return {
        mainHeader: "Ways you relax",
        subHeader:
          "Let’s capture your go-to ways to unwind, recharge, and feel good.",
        CTAButton: "All set—save it",
        AddOtherCTA: "Add your own method",
      };
    case "Mindfullness Activities":
      return {
        mainHeader: "Your mindfulness habits",
        subHeader:
          "Let’s note how you stay present and grounded—plus what you’re open to trying next.",
        CTAButton: "Save & reflect",
        AddOtherCTA: "",
      };
    case "Learning & Development":
      return {
        mainHeader: "Your growth & learning interests ",
        subHeader:
          "Let’s explore how you like to grow and learn — from what inspires you to how you support yourself day to day. ",
        CTAButton: "Save & continue ",
        AddOtherCTA: "",
      };
    case "Stress Management Techniques":
      return {
        mainHeader: "How you manage stress ",
        subHeader:
          "From quiet moments to go-to habits—what helps you feel more at ease?",
        CTAButton: "Save & continue",
        AddOtherCTA: "",
      };
    case "Holistics Health Practices":
      return {
        mainHeader: "Holistic practices you prefer ",
        subHeader:
          "Open to exploring or already using holistic therapies? Pick the ones that feel right for you. ",
        CTAButton: "Save",
        AddOtherCTA: "",
      };
    case "Preferred Devices":
      return {
        mainHeader: "Devices You Prefer",
        subHeader:
          "Choose the devices you're most comfortable using to explore and interact with Zumlo.",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "Preferred Communication Channels":
      return {
        mainHeader: "How you like to communicate ",
        subHeader:
          "Choose the communication channels you're most comfortable using to explore and interact with Zumlo. ",
        CTAButton: "Save my preferences",
        AddOtherCTA: "",
      };
    case "Preferred Communication Style":
      return {
        mainHeader: "Your communication style ",
        subHeader:
          "Choose the communication style you're most comfortable with when interacting and exploring.",
        CTAButton: "Save my preferences",
        AddOtherCTA: "",
      };
    case "Tech-Services":
      return {
        mainHeader: "Comfort level with technology ",
        subHeader:
          "Choose how comfortable you feel using technology to explore and interact with Zumlo. ",
        CTAButton: "Save my preferences",
        AddOtherCTA: "",
      };
    case "Content Preferences":
      return {
        mainHeader: "Favorite types of content",
        subHeader:
          "Choose the types of educational content you're most comfortable exploring and engaging with on Zumlo.",
        CTAButton: "Save my preferences",
        AddOtherCTA: "",
      };
    case "Preferred Learning Style":
      return {
        mainHeader: "Preferred Ways to Learn",
        subHeader:
          "Choose the learning style you're most comfortable with for exploring and interacting with Zumlo.",
        CTAButton: "Save my preferences",
        AddOtherCTA: "",
      };
    case "Preferred Instructional":
      return {
        mainHeader: "Guidance & Advice Style",
        subHeader:
          "Choose the style of guidance and advice that feels most comfortable when interacting with Zumlo.",
        CTAButton: "Save my preferences",
        AddOtherCTA: "",
      };
    case "Accessibility Needs":
      return {
        mainHeader: "Your accessibility needs",
        subHeader:
          "Choose any specific accessibility needs you have, so Zumlo can offer the best experience for you.",
        CTAButton: "Save my preferences",
        AddOtherCTA: "",
      };
    case "Preferences for App Usability Features":
      return {
        mainHeader: "App usability preferences",
        subHeader:
          "Choose the usability features and appearance that help you feel most comfortable using Zumlo.",
        CTAButton: "Save my preferences",
        AddOtherCTA: "",
      };
    case "Additional Comments or Preferences":
      return {
        mainHeader: "Anything else we should know? ",
        subHeader:
          "Share any other thoughts or preferences about your experience with Zumlo. This helps personalize your journey even more.",
        CTAButton: "Save my preferences",
        AddOtherCTA: "",
      };
    case "Strengths":
      return {
        mainHeader: "",
        subHeader: "Pick all the strengths that resonate with you.",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };

    case "":
      return {
        mainHeader: "",
        subHeader: "",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "":
      return {
        mainHeader: "",
        subHeader: "",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    case "":
      return {
        mainHeader: "",
        subHeader: "",
        CTAButton: "Save my info",
        AddOtherCTA: "",
      };
    default:
      return null;
  }
};
