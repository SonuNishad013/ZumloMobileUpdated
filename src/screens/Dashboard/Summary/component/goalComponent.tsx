import React, { FunctionComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Svg, Circle } from "react-native-svg";
import colors from "../../../../constant/colors";
import { Enum_OverviewType } from "../../../../constant/ENUM";
import { strings } from "../../../../constant/strings";
import { styles } from "./styles";

export const GoalCardView = ({
  title,
  activities,
  progress,
  color,
  overviewType,
  numberOfprompts,
  numberOfJournals,
}: any) => {
  const radius = 30;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (circumference * progress) / 100;

  return (
    <View style={styles.goalItem}>
      <View style={styles.progressCircle}>
        <Svg height="70" width="70">
          <Circle
            stroke={colors.SurfCrest}
            fill="none"
            cx="35"
            cy="35"
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke={color}
            fill="none"
            cx="35"
            cy="35"
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            rotation="-90"
            origin="35,35"
          />
        </Svg>
        <Text style={styles.progressText}>
          {overviewType === Enum_OverviewType?.Journals
            ? `${numberOfJournals}${"\n"}`
            : `${progress}%${"\n"}`}
          <Text style={styles.subText}>
            {overviewType === Enum_OverviewType?.Journals
              ? Enum_OverviewType?.Journals
              : strings?.Progress}
          </Text>
        </Text>
      </View>

      <View style={styles.goalDetails}>
        <Text style={[styles.goalTitle, { color }]}>{title}</Text>
        <Text style={styles.goalSubtitle}>
          {overviewType === Enum_OverviewType?.Journals
            ? `Contains ${numberOfprompts?.Custom} Custom & ${numberOfprompts?.AiPrompts} AI prompts`
            : `Contains ${activities} Activities`}
        </Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </View>
  );
};
interface QuestionsIndexProps {
  goalData?: any;
  onGoalCard?: any;
  isGoalsCard?: boolean;
}

const GoalsCard: FunctionComponent<QuestionsIndexProps> = ({
  goalData,
  onGoalCard,
  isGoalsCard = false,
}) => {
  return (
    <View style={!isGoalsCard ? styles.card : styles.Goalcard}>
      {!isGoalsCard && <Text style={styles.cardTitle}>Your Goals</Text>}
      {goalData.map((goal: any) => (
        <TouchableOpacity onPress={() => onGoalCard(goal.id, goal.item, goal)}>
          <GoalCardView key={goal.id} {...goal} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default GoalsCard;
