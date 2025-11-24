import logger from "../../../../constant/logger";
import { strings } from "../../../../constant/strings";

export function getProgressMessage(progress: number) {
  logger("progress__", progress);
  switch (true) {
    case progress >= 0 && progress < 25:
      return {
        title: strings.progressTitle_0_24,
        message: strings.progressMessage_0_24,
      };

    case progress >= 25 && progress < 50:
      return {
        title: strings.progressTitle_25_49,
        message: strings.progressMessage_25_49,
      };

    case progress >= 50 && progress < 75:
      return {
        title: strings.progressTitle_50_74,
        message: strings.progressMessage_50_74,
      };

    case progress >= 75 && progress < 100:
      return {
        title: strings.progressTitle_75_99,
        message: strings.progressMessage_75_99,
      };

    case progress === 100:
      return {
        title: strings.progressTitle_100,
        message: strings.progressMessage_100,
      };

    default:
      return {
        title: strings.progressTitle_default,
        message: strings.progressMessage_default,
      };
  }
}
