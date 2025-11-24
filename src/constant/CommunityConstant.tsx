import {
  AddMembers,
  CameraIcon,
  DeleteIcon,
  DeleteSaltIcon,
  EditIconSalt,
  PinIconsurf,
  RemoveMembers,
  Repost,
  ShareInChat,
  ShareInGroup,
  TagUsersIcon,
} from "../assets";

const delete_ = "Delete";
const update_ = "Update";
const report_ = "Report";
const editGroupDetails = "Edit group details";
const addMemberGroup = "Add member in group";
const removeMemberGroup = "Remove member in group";
const deleteGroup = "Delete group";
const repost = "Repost";
const group = "Group";
const connection = "Connection";

export const communityCode = {
  community: "Community",
  profile_not_found: "Profile not found.",
  profile_blocked: "Your access to community is blocked.",
  User_not_found: "User not found.",
};

export const categoryName = {
  zumloCommunity: "ZumloCommunity",
  communityAvatars: "CommunityAvatars",
  healthConditions: "HealthConditions",
  CommunityGroupCategory: "CommunityGroupCategory",
  reportFeedReasons: "ReportFeedReasons",
};

export const groupPrivacyType = {
  private: "Private",
  public: "Public",
  invite: "Invite",
};

export const postCode = {
  self: "self",
  group: "group",
};

export const features = [
  {
    title: "camera",
    icon: CameraIcon,
  },
  {
    title: "attachments",
    icon: PinIconsurf,
  },
  // {
  //   title: "tags",
  //   icon: TagUsersIcon,
  // },
];
export const switchCodes = {
  camera: "camera",
  attachments: "attachments",
  tags: "tags",
  update: update_,
  delete: delete_,
  editGroupDetails: editGroupDetails,
  deleteGroup: deleteGroup,
  addMemberGroup: addMemberGroup,
  removeMemberGroup: removeMemberGroup,
  report: report_,
  repost: repost,
  group: group,
  connection: connection,
};

export const fromNav = {
  individual_Feed: "Individual feed",
  create_Group: "Create group",
  in_Group: "In_Group",
  groupDetailsEdit: "groupDetailsEdit",
  groupDetailsAddMembers: "GroupDetailsAddMembers",
  groupDetailsRemoveMembers: "GroupDetailsRemoveMembers",
};

export const menuDataFeedSelf = [
  {
    title: update_,
    icon: EditIconSalt,
  },
  {
    title: delete_,
    icon: DeleteIcon,
  },
];

export const shareFeedMenu = [
  {
    title: repost,
    icon: Repost,
  },
  {
    title: group,
    icon: ShareInGroup,
  },

  {
    title: connection,
    icon: ShareInChat,
  },
];

export const menuDataFeedOther = [
  {
    title: report_,
    icon: EditIconSalt,
  },
  // {
  //   title: delete_,
  //   icon: DeleteIcon,
  // },
];
export const menuDataFeedOtherWithDelete = [
  {
    title: report_,
    icon: EditIconSalt,
  },
  {
    title: delete_,
    icon: DeleteIcon,
  },
];

export const menuDataGroup = [
  {
    title: editGroupDetails,
    icon: EditIconSalt,
  },
  {
    title: addMemberGroup,
    icon: AddMembers,
  },
  {
    title: removeMemberGroup,
    icon: RemoveMembers,
  },
  {
    title: deleteGroup,
    icon: DeleteSaltIcon,
  },
];
// Allowed MIME types for images and videos
export const allowedImageFormats = [
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/jpg",
]; // JPG, PNG, iPhone PNG (HEIC)
export const allowedVideoFormats = [
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-matroska",
]; // MP4, MOV, AVI, MKV

export const responeKey = {
  aliasName: "?AliasName=",
  aliasName_01: "&AliasName=",
  aliasName_1: "AliasName=",
  aliasProfilePicture: "AliasProfilePicture",
  image_jpg: "image/jpg",
  imageJpg: "image.jpg",
  otherProfilePicture: "&OtherProfilePicture=",
  fileTypeCommunityprofilepicture: "&FileType=communityProfilepicture",
  title: "Title=",
  Description: "&Description=",
  groupId: "&GroupId=",
  tagUsers: "&TagUsers=",
  contents: "Contents",
  profilePicture: "ProfilePicture",
  name: "?Name=",
  nameUpdate: "&Name=",
  id: "?Id=",
  fileTypeGroupPrivacy: "&FileType=groupprofilepicture&GroupPrivacy=",
  groupRules: "&GroupRules=",
  healthCategory: "&HealthCategory=",
};

export const feedShareType = {
  timeline: 1,
  group: 2,
  direct: 3,
  socialMedia: 4,
};
