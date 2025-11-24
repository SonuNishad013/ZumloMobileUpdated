import logger from "../../../constant/logger";

interface HeaderSubHeaderType {
  header: string;
  subHeader: string;
}
export const getHeaderSubHeaderText = (
  categoryDataName: string
): HeaderSubHeaderType => {
  logger("categoryDataName____", categoryDataName);
  switch (categoryDataName) {
    case "Lifestyle & Habits":
      return {
        header: "Your lifestyle snapshot",
        subHeader:
          "Tap each area to share your habits and preferences—let's tailor your wellness journey together.",
      };
    case "Feedback and Interactions":
      return {
        header: "Your voice matters",
        subHeader:
          "How do you interact with Zumlo? Your feedback helps create the best possible experience for you and the entire whole Zumlo community.",
      };
    case "Cultural and Personal Beliefs":
      return {
        header: "Cultural and personal beliefs  ",
        subHeader:
          "Your background, values, and lived experience matter. Choose any areas you’d like Zumlo to be mindful of when personalizing your journey. ",
      };
    case "Social and Community Engagement":
      return {
        header: "Social and community engagement",
        subHeader:
          "Explore how connection, support, and belonging show up in daily life.",
      };

    case "Sleep Patterns":
      return {
        header: "Your sleep at a glance",
        subHeader:
          "Here's what you've shared about your sleep. Tap edit anytime if something changes.",
      };
    case "Daily Routines":
      return {
        header: "Your daily routine summary",
        subHeader: "Review your routines. Tap edit if something changed! ",
      };
    case "Personality Information":
      return {
        header: "Your personality snapshot ",
        subHeader:
          "Here's what you've shared about yourself. Tap edit to update anytime.",
      };
    case "Substance Use":
      return {
        header: "Your substance use summary",
        subHeader: "Here's what you've shared. Tap edit to update anytime.",
      };
    case "Technology Usage":
      return {
        header: "Your tech habits snapshot",
        subHeader:
          "Here’s what you’ve shared. Want to change anything? Just tap edit.",
      };
    case "Social Life":
      return {
        header: "Your social life summary",
        subHeader:
          "Here's a quick look at what you've shared about your social connections. Want to update? Just tap edit.",
      };
    case "Hobbies and Interest":
      return {
        header: "Your hobbies & interests snapshot",
        subHeader:
          "Here's a quick summary of what you've shared. Feel free to edit anytime.",
      };
    case "Exercise and Physical Activity":
      return {
        header: "Your exercise snapshot",
        subHeader:
          "Here's your quick exercise summary. Tap edit anytime to update.",
      };
    case "Motivation and Drive":
      return {
        header: "What drives you",
        subHeader:
          "Here's a quick look at what fuels your motivation. Want to make changes? Just tap edit.",
      };
    case "Support System":
      return {
        header: "Your support network snapshot",
        subHeader:
          "Here's a quick view of your support systems. Want to make changes? Just tap edit.",
      };
    case "Dietary Habits ":
      return {
        header: "Your dietary habits snapshot",
        subHeader:
          "Here's what you've shared about your eating habits. Tap edit anytime to update.",
      };
    case "App Usage Patterns":
      return {
        header: "Your app usage patterns",
        subHeader:
          "Here’s a snapshot of how you typically use Zumlo. Feel free to edit anytime—it helps tailor the experience around what works for you.",
      };
    case "User Feedback and Reviews":
      return {
        header: "User feedback and reviews",
        subHeader:
          "Your thoughts matter. Track and update how you’ve felt about the app experience.",
      };
    case "Participation in Surveys and Research":
      return {
        header: "Participation in surveys and research",
        subHeader:
          "From quick check-ins to deeper insights, your input helps shape a better Zumlo—for you and others. You choose what you're up for.",
      };
    //-------------------//
    case "Cultural Practices and Beliefs":
      return {
        header: "Cultural practices",
        subHeader:
          "Traditions, customs, or ways of life—big or small—they all shape how one moves through the world. Let’s capture what matters most.",
      };
    case "Religious Beliefs & Affiliations":
      return {
        header: "Religious beliefs",
        subHeader:
          "Choose what reflects your beliefs and practices—if any. All answers welcome.",
      };
    case "Traditions and Practices":
      return {
        header: "Traditions and practices",
        subHeader:
          "Cultural and spiritual rhythms shape everyday life. Explore the ones that matter most.",
      };
    case "Personal Values & Principles":
      return {
        header: "Personal values & principles",
        subHeader:
          "The beliefs, philosophies, and people that make you, you. Tap into what matters most.",
      };
    case "Moral and Ethical Values":
      return {
        header: "Moral and ethical values",
        subHeader:
          "A look at the values and principles that shape decisions, actions, and the way life is approached.",
      };
    case "Socioeconomic Status":
      return {
        header: "Employment status",
        subHeader:
          "Select the option that best reflects your current work situation.",
      };
    case "Social Interactions":
      return {
        header: "Social interactions",
        subHeader:
          "A quick check-in on how often social connection shows up in daily life—because it matters.",
      };
    case "Social Support System":
      return {
        header: "Mentors & guidance",
        subHeader:
          "Think of people who’ve been there to guide, encourage, or share wisdom—professionally or personally.",
      };
    case "Family Information":
      return {
        header: "Family information",
        subHeader:
          "Explore family dynamics and how they shape emotional well-being.",
      };
    case "Social Connections":
      return {
        header: "Social connections",
        subHeader:
          "Connections matter. Reflect on the people who shape your world—friends, mentors, and those who truly get you.",
      };
    case "Community Involvement":
      return {
        header: "Community involvement",
        subHeader:
          "Community is connection. Explore ways involvement shapes purpose and belonging.",
      };
    case "Social Media":
      return {
        header: "Social media",
        subHeader:
          "Explore how online spaces influence connection, mood, and overall well-being.",
      };
    case "":
      return {
        header: "",
        subHeader: "",
      };
    case "":
      return {
        header: "",
        subHeader: "",
      };
    case "":
      return {
        header: "",
        subHeader: "",
      };
    default:
      return {
        header: "",
        subHeader: "",
      };
  }
};
