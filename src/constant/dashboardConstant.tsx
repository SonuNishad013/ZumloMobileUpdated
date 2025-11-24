import {
  RelaxedIcon,
  RelaxedMinIcon,
  SadIconOrg,
  StressedMinIcon,
  VeryRelaxedIcon,
  VeryRelaxedMinIcon,
  VerySadIcon,
  VeryStressedMinEmoji,
} from "../assets";

export const sleepData = [
  {
    id: 1,
    feeling: "Excellent",
    iconOrg: VeryRelaxedIcon,
    normalIcon: VeryRelaxedMinIcon,
  },
  {
    id: 2,
    feeling: "Fair",
    iconOrg: RelaxedIcon,
    normalIcon: RelaxedMinIcon,
  },
  {
    id: 3,
    feeling: "Very Poor",
    iconOrg: VerySadIcon,
    normalIcon: StressedMinIcon,
  },
  {
    id: 4,
    feeling: "Poor",
    iconOrg: SadIconOrg,
    normalIcon: VeryStressedMinEmoji,
  },
];
