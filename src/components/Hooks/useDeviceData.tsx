import axios from "axios";
import qs from "qs";
import moment from "moment";
import fitbitConfig from "../../config/fitbitConfig";

function getData(access_token: any) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + fitbitConfig.clientEncodeId,
    },
  };

  const body = {
    clientId: fitbitConfig.client_id,
    grant_type: "authorization_code",
    redirect_uri: "zumlo://fit", //"alertease://fit",
    code: access_token,
  };

  return axios
    .post(
      "https://api.fitbit.com/oauth2/token",
      qs.stringify(body),
      requestOptions
    )
    .then(handleFitbitTokenResponse)
    .catch(handleError);
}

function handleFitbitTokenResponse(response: any) {
  const accessToken = response?.data?.access_token;
  if (!accessToken) {
    console.error("Access token not found in Fitbit response");
    return null;
  }

  const date = new Date();
  const formattedDate = moment(date).format("YYYY-MM-DD");

  return fetchCaloriesData(accessToken, formattedDate);
}

function fetchCaloriesData(accessToken: string, date: string) {
  return fetch(
    `https://api.fitbit.com/1/user/-/activities/tracker/calories/date/${date}.json`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
    .then((response) => response.json())
    .then(handleCaloriesResponse)
    .catch(handleError);
}

function handleCaloriesResponse(response: any) {
  console.log("Calories data: ", response);
  // Do further processing with the calories data
  return response;
}

function handleError(error: any) {
  console.error("Error: ", error);
  return null;
}

export { getData };
