import { alertTypes } from "../constant/AllGlobalNameConstant";
import logger from "../constant/logger";
import { strings } from "../constant/strings";

export const alertMoDeatils = (alertType: any) => {
  logger("alertType_____", alertType);
  if ([alertTypes?.logout].includes(alertType)) {
    return {
      title: "Logging out already? ",
      message:
        "You’ll be logged out and will need to sign in again later. Still want to go? ",
      cancelButtonText: "No, take me back ",
      confirmButtonText: "Yes, log me out",
    };
  } else if ([alertTypes?.deleteAccount].includes(alertType)) {
    return {
      title: "This is goodbye—for real? ",
      message:
        "Deleting your account means all your progress and preferences will be gone—and there’s no going back. Want to go ahead? ",
      confirmButtonText: "Yes, let's do it",
      cancelButtonText: "Never mind ",
    };
  } else if ([alertTypes?.familyMemberInfo].includes(alertType)) {
    return {
      title: "",
      message:
        "Kindly fill in the name or relationship fields before adding a new entry.",
      confirmButtonText: "Okay",
      // cancelButtonText: "Cancel",
    };
  } else if ([alertTypes?.mediaPicker].includes(alertType)) {
    return {
      title: "Select Media",
      message: "Choose an option to select media",
      confirmButtonText: "Camera",
      confirmButtonText2: "Gallery",
    };
  } else if ([alertTypes?.mediaType].includes(alertType)) {
    return {
      title: "Select Media Type",
      message: "Choose an option to select media type",
      confirmButtonText: "Image",
      confirmButtonText2: "Video",
    };
  } else if ([alertTypes?.editGoalsActivities].includes(alertType)) {
    return {
      title: "Choose One",
      message: "By selecting one you will able to edit the selected option.",
      confirmButtonText: "GOAL",
      confirmButtonText2: "ACTIVITIES",
    };
  } else if ([alertTypes?.requireField].includes(alertType)) {
    return {
      title: "Input Required",
      message:
        "Please select at least one option or fill in the text field to continue.",
      confirmButtonText: "Got it",
      // cancelButtonText: "Cancel"
    };
  } else {
    return {
      title: "Alert",
      message: "Something went wrong",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    };
  }
};
