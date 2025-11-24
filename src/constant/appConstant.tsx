import { imagePath } from "../assets/png/imagePath";
// export const environment = "development";
export const environment: any = "staging";
// export const environment: any = "QA";
// export const environment: any = "production";

function getEnvironment(environment: any) {
  const env: any = {
    development: "dev",
    staging: "staging",
    QA: "qa",
    production: "production",
    VAPT: "VAPT",
  };
  if (env[environment] === "production") {
    return "api.zumlo.co/";
  }
  return env[environment] + "-api.zumlo.co/";
}

export default {
  UserManagement_API: `https://${getEnvironment(
    environment
  )}user-service/api/v1/`,
  Config_API: `https://${getEnvironment(environment)}config-service/api/v1/`,
  DocumentMangement_API: `https://${getEnvironment(
    environment
  )}doc-service/api/v1/`,
  Device_API: `https://${getEnvironment(environment)}device-service/api/v1/`,
  AI_API: `https://${getEnvironment(environment)}ai-service/api/v1/`,
  Wellness_API: `https://${getEnvironment(
    environment
  )}wellness-service/api/v1/`,

  Notification_API: `https://${getEnvironment(
    environment
  )}notification-service/api/v1/`,

  Community: `https://${getEnvironment(environment)}community-service/api/v1/`,

  Billing: `https://${getEnvironment(environment)}billing-service/api/v1/`,

  socketUrl: `https://${getEnvironment(environment)}ai-service`,
  communitySocketUrl: `https://${getEnvironment(environment)}community-service`,
  notificationSocketurl: `https://${getEnvironment(
    environment
  )}notification-service`,
  AISocketurl: `https://${getEnvironment(environment)}ai-service`,
  logEnable: true,
  deviceErrMsg: "error",
  zumlo_pvtKey: "dfff",
  appVersion: "1.0",
  sourceId: 21,
  credentialType: {
    email: "1",
    phone: "2",
    google: "3",
    apple: "4",
  },
  explorer_planner_type: {
    explorer: 320,
    planner: 319,
  },
  authTabData: [
    {
      title: "Email",
    },
    {
      title: "Phone",
    },
  ],

  communityTabData: [
    {
      title: "Home",
      icon: imagePath?.House,
    },
    {
      title: "Group",
      icon: imagePath?.ProfileUser,
    },
    {
      title: "Profile",
      icon: imagePath?.UserSquare,
    },
    {
      title: "Search",
      icon: imagePath?.SearchAny,
    },
  ],
  profileDetailsTab: [
    {
      id: 1,
      title: "My feeds",
    },
    {
      id: 2,
      title: "Groups",
    },
    {
      id: 3,
      title: "Activities",
    },
  ],

  groupMemebersDetailsTab: [
    {
      id: 1,
      title: "Connected",
    },
    {
      id: 2,
      title: "Requested",
    },
    {
      id: 3,
      title: "Invited",
    },
    {
      id: 4,
      title: "Blocked",
    },
  ],
  groupMemebersDetailsTabForuser: [
    {
      id: 1,
      title: "Connected",
    },
  ],
};

export const seekerLoginType = {
  email: 1,
  phone: 2,
  google: 3,
  apple: 4,
};
export const dynamicDataType = {
  Single_Select: "SingleSelect",
  Input: "Input",
  TextArea: "TextArea",
  Slider: "Slider",
  MultiSelect: "MultiSelect",
  DatePicker: "DatePicker",
  CircleSelect: "CircleSelect",
  Dropdown: "Dropdown",
};
export const activityGraphType = {
  line: "line",
};
export const wellnessGolaActivityFilter = {
  day: "1",
  week: "2",
  month: "3",
  overall: "4",
};
export const discardActivityEnums = {
  activity: 2,
  goals: 1,
  wellness: 3,
};

export const aiProvider = {
  Deepinfra: "1",
  TogetherAI: "2",
  OpenAI: "3",
  Chat: "4",
  WellnessPlan: "4",
  Goals: "3",
  Activities: "3",
  Recommendations: "3",
  ETL: "1",
  DynamicPrompting: "2",
  ActivityFeedback: "2",
  Quiz: "1",
  DailyAffirmation: "3",
  MoodJournaling: "3",
};

export const videoLimit = {
  MB_5: 5,
  MB_25: 25,
};
export const imageLimit = {
  MB_2: 2,
  IMAGE_HEIGHT: 400,
  IMAGE_WIDTH: 400,
};

export const STATUS_CODES = {
  RESPONSE_OK: 200,
  RESPONSE_SUCCESS: 201,
  RESPONSE_ACCEPTED: 202,
};
export const TOAST_STATUS = {
  ERROR: 0,
  SUCCESS: 1,
};

export const OTP_LIMIT = {
  limit: 6,
};

export const longTermVariants_ = [
  "long-term",

  "long term",

  "longterm",

  "Long-term",

  "Long term",

  "Longterm",

  "LONG TERM",

  "LONG-TERM",

  "LONGTERM",
];

export const shortTermVariants = [
  "short-term",

  "short term",

  "shortterm",

  "Short-term",

  "Short term",

  "Shortterm",

  "SHORT TERM",

  "SHORT-TERM",

  "SHORTTERM",
];
