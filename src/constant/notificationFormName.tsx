export const community_Group_Invitation = "CommunityGroupInvitation";
export const community_Join_Request = "CommunityJoinRequest";
export const liked_Feed = "LikedFeed";
export const ReportedOnFeed = "ReportedOnFeed";
export const RepliedOnFeed = "RepliedOnFeed";
export const CommentedOnFeed = "CommentedOnFeed";
export const notificationTypesId = {
  alert: 1,
  reminder: 2,
  update: 3,
  activitiesPushNotification: 4,
  orgOnboarding: 5,
  moodJournalPushNotification: 6,
  healthTips: 7,
  communityGroupInvitation: 8,
  taggedUserNotification: 9,
  likedFeed: 10,
  commentFeed: 11,
  commentReply: 12,
  connectUser: 13,
  communityJoinRequest: 14,
  DeleteFeed: 17,
  ReportFeed: 15,
  DeleteGroup: 16,
};

export const notifictionUITypeList = [
  notificationTypesId?.communityGroupInvitation,
  notificationTypesId?.communityJoinRequest,
  notificationTypesId?.connectUser,
];

export const notifictionUITypeList2 = [
  notificationTypesId?.taggedUserNotification,
  notificationTypesId?.likedFeed,
  notificationTypesId?.commentFeed,
  notificationTypesId?.commentReply,
  notificationTypesId?.DeleteFeed,
  notificationTypesId?.ReportFeed,
  notificationTypesId?.DeleteGroup,
];

export const NotificationTypes = [
  {
    id: 1,
    name: "Alert",
    value: 1,
  },
  {
    id: 2,
    name: "Reminder",
    value: 2,
  },
  {
    id: 3,
    name: "Update",
    value: 3,
  },
  {
    id: 4,
    name: "ActivitiesPushNotification",
    value: 4,
  },
  {
    id: 5,
    name: "OrgOnboarding",
    value: 5,
  },
  {
    id: 6,
    name: "MoodJournalPushNotification",
    value: 6,
  },
  {
    id: 7,
    name: "HealthTips",
    value: 7,
  },
  {
    id: 8,
    name: "CommunityGroupInvitation",
    value: 8,
  },
];
