import { FlatList, View } from "react-native";
import React, { useMemo, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import HeaderNutrition from "./HeaderNutrition";
import NamePoints from "./NamePoints";
import { imagePath } from "../../../assets/png/imagePath";
import NutritionDietList from "./NutritionDietList";
import { style } from "./style";

interface Props {
  navigation?: any;
}
const NutritionDetails: React.FC<Props> = ({ navigation }) => {
  const [nutritionData, setNutritionData] = useState([
    {
      id: 1,
      name: "Eat a Variety of Foods ",
    },
    {
      id: 2,
      name: "Portion Control",
    },
    {
      id: 3,
      name: "Include Fruits and Vegetables",
    },
    {
      id: 4,
      name: "Watch Your Sugar Intake",
    },
    {
      id: 5,
      name: "Plan and Prepare Meals",
    },
    {
      id: 6,
      name: "Choose Healthy Fats",
    },
  ]);
  const [nutritionDiet, setNutritionDiet] = useState([
    {
      id: 1,
      name: "Easy Fish Tacos",
      icon: imagePath?.EggIcon,
      rating: "4.8",
      type: "Mexican",
      description:
        "Fish tacos are a favorite quick and easy weeknight meal. Choose cod, tilapia, or halibut, quickly pan-sear in a skillet, and serve with a simply cabbage slaw. 20 minutes start to finish!",
      divTime: [
        {
          title: "Prep Time",
          time: "15 min",
        },
        {
          title: "Cook Time",
          time: "16 min",
        },
        {
          title: "Total Time",
          time: "15 min",
        },
      ],
      servingsTitle: "Servings",
      servings: "3 sevings",
      note: "TRY THIS! Instead of drizzling the taco sauce over top, my husband likes to smear it on the tortilla before assembling the tacos. He says that way he gets more sauce in each bite. Give it a try and see what you think!",
      ingredients: [
        {
          title: "For the Fish",
          steps: [
            "1 pound cod, tilapia, halibut, or other white fish filets",
            "2 to 3 teaspoons chili powder, enough to coat the fish",
            "1 teaspoon kosher salt",
          ],
        },
        {
          title: "For the fish taco sauce:",
          steps: [
            "1/2 cup sour cream",
            "1/4 cup mayonnaise",
            "3 to 4 tablespoons lime juice (from 2 limes)",
            "1 teaspoon hot sauce, optional",
          ],
        },
        {
          title: "To assemble:",
          steps: [
            "1/2 small head red cabbage, shredded (about 4 cups)",
            "12 taco-sized corn or flour tortillas",
            "1 avocado, sliced",
            "4 radishes, thinly sliced",
            "4 spring onions, thinly sliced",
            "1/3 cup roughly chopped cilantro",
          ],
        },
      ],
      process: [
        {
          tProcess: "Make the fish taco sauce:",
          work: " In a small bowl, combine the sour cream, mayonnaise, lime juice, and hot sauce (if using) for the taco sauce. Stir until combined",
        },
        {
          tProcess: "Make the red cabbage slaw:",
          work: " In a medium bowl, combine the shredded cabbage with 3 tablespoons of the taco sauce. Stir to coat and add more taco sauce if you like. (The cabbage shouldn't be dripping with sauce; aim for a very thin coating.)",
        },
        {
          tProcess: "Warm the tortillas:",
          work: " In a dry skillet over medium-high heat, warm the tortillas one at a time for about 30 seconds on both sides. Alternatively, wrap 1 to 3 tortillas in a damp paper towel and microwave for 30 seconds, until warm.Keep warmed tortillas wrapped in a clean dish towel while you make the fish.",
        },
        {
          tProcess: "Season the fish:",
          work: "Sprinkle the fish on both sides with chili powder and salt. Gently rub in the seasonings with your fingers to make sure the fish is entirely coated.",
        },
      ],
    },
    {
      id: 2,
      name: "Easy Fish Tacos",
      icon: imagePath?.EggIcon,
      rating: "4.8",
      type: "Mexican",
      description:
        "Fish tacos are a favorite quick and easy weeknight meal. Choose cod, tilapia, or halibut, quickly pan-sear in a skillet, and serve with a simply cabbage slaw. 20 minutes start to finish!",
      divTime: [
        {
          title: "Prep Time",
          time: "15 min",
        },
        {
          title: "Cook Time",
          time: "16 min",
        },
        {
          title: "Total Time",
          time: "15 min",
        },
      ],
      servingsTitle: "Servings",
      servings: "3 sevings",
      note: "TRY THIS! Instead of drizzling the taco sauce over top, my husband likes to smear it on the tortilla before assembling the tacos. He says that way he gets more sauce in each bite. Give it a try and see what you think!",
      ingredients: [
        {
          title: "For the Fish",
          steps: [
            "1 pound cod, tilapia, halibut, or other white fish filets",
            "2 to 3 teaspoons chili powder, enough to coat the fish",
            "1 teaspoon kosher salt",
          ],
        },
        {
          title: "For the fish taco sauce:",
          steps: [
            "1/2 cup sour cream",
            "1/4 cup mayonnaise",
            "3 to 4 tablespoons lime juice (from 2 limes)",
            "1 teaspoon hot sauce, optional",
          ],
        },
        {
          title: "To assemble:",
          steps: [
            "1/2 small head red cabbage, shredded (about 4 cups)",
            "12 taco-sized corn or flour tortillas",
            "1 avocado, sliced",
            "4 radishes, thinly sliced",
            "4 spring onions, thinly sliced",
            "1/3 cup roughly chopped cilantro",
          ],
        },
      ],
      process: [
        {
          tProcess: "Make the fish taco sauce:",
          work: " In a small bowl, combine the sour cream, mayonnaise, lime juice, and hot sauce (if using) for the taco sauce. Stir until combined",
        },
        {
          tProcess: "Make the red cabbage slaw:",
          work: " In a medium bowl, combine the shredded cabbage with 3 tablespoons of the taco sauce. Stir to coat and add more taco sauce if you like. (The cabbage shouldn't be dripping with sauce; aim for a very thin coating.)",
        },
        {
          tProcess: "Warm the tortillas:",
          work: " In a dry skillet over medium-high heat, warm the tortillas one at a time for about 30 seconds on both sides. Alternatively, wrap 1 to 3 tortillas in a damp paper towel and microwave for 30 seconds, until warm.Keep warmed tortillas wrapped in a clean dish towel while you make the fish.",
        },
        {
          tProcess: "Season the fish:",
          work: "Sprinkle the fish on both sides with chili powder and salt. Gently rub in the seasonings with your fingers to make sure the fish is entirely coated.",
        },
      ],
    },
  ]);

  const memorizedNutritionData = useMemo(
    () => <NamePoints data={nutritionData} />,
    [nutritionData]
  );
  const memorizedNutritionDietList = useMemo(
    () => (
      <NutritionDietList
        nutritionDiet={nutritionDiet}
        navigation={navigation}
      />
    ),
    [nutritionDiet]
  );
  const renderItems = () => {
    return (
      <View style={style?.container}>
        {memorizedNutritionData}
        {memorizedNutritionDietList}
      </View>
    );
  };

  return (
    <ScreenWrapper statusBarColor={colors?.bgNutrition}>
      {/* <ImageBackground
        style={{ flex: 1 }}
        source={imagePath?.BgImageForActivities}
      > */}
      <View style={style?.mainView}>
        <HeaderNutrition headerName={"Nutrition"} navigation={navigation} />
        <FlatList
          data={["1"]}
          keyExtractor={(item, index) => "key" + index}
          renderItem={renderItems}
          contentContainerStyle={style?.contentContainerStyle}
        />
      </View>
      {/* </ImageBackground> */}
    </ScreenWrapper>
  );
};

export default NutritionDetails;
