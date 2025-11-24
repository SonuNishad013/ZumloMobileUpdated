import logger from "../../../constant/logger";

export const NavLabelWithCardLabels = (
  navLabel: string,
  cardLabel?: string
): { navLabel: string; editLabel: string; editSubtext: string } => {
  logger("navLabel____cardLabel", { navLabel, cardLabel });
  switch (navLabel) {
    case "Sleep Patterns":
      return {
        navLabel: "Sleep Patterns Overview",
        editLabel: "",
        editSubtext: "",
      };
    case "Personality Information":
      return {
        navLabel: "Personality information overview",
        editLabel:
          editCardHeaderSubHeaderText(cardLabel || "")?.editHeader || "",
        editSubtext:
          editCardHeaderSubHeaderText(cardLabel || "")?.editSubHeader || "",
      };
    default:
      return {
        navLabel: "",
        editLabel: "",
        editSubtext: "",
      };
  }
};

export const editCardHeaderSubHeaderText = (
  codeName: string
): { editHeader: string; editSubHeader: string } => {
  switch (codeName) {
    case "Personality Type":
      return {
        editHeader: "",
        editSubHeader: "",
      };
    case "Personality Traits":
      return {
        editHeader: "",
        editSubHeader: "",
      };
    case "Strengths":
      return {
        editHeader: "",
        editSubHeader: "",
      };
    case "Weaknesses":
      return {
        editHeader: "",
        editSubHeader: "",
      };
    case "Additional Associated Fields for Context":
      return {
        editHeader: "",
        editSubHeader: "",
      };
    case "":
      return {
        editHeader: "",
        editSubHeader: "",
      };

    default:
      return {
        editHeader: "",
        editSubHeader: "",
      };
  }
};
