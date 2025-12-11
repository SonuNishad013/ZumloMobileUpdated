import { MEMBERSHIP_DURATION } from "./ENUM";

export const subscriptionFun = async (
  subscriptionDetail: any,
  getseekerInfoRedux: any
) => {
  const {
    isBetaUser,
    isFreeTrialActive,
    isOrganizationSeeker,
    isOrganizationPlanValid,
  } = getseekerInfoRedux?.basicInformation;

  return true;
  if (isBetaUser || isOrganizationPlanValid || isFreeTrialActive) {
    return true;
  } else {
    if (
      subscriptionDetail?.isPlanActive &&
      subscriptionDetail?.planName != MEMBERSHIP_DURATION?.BASIC
    ) {
      return true;
    } else {
      return false;
    }
  }
};
