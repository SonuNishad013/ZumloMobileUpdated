import { GoogleSignin } from "@react-native-google-signin/google-signin";
import ToastMsg from "../components/Hooks/useToast";

export const loginWithGoogle = async () => {
  return new Promise((resolve, reject) => {
    GoogleSignin.configure({
      //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 Web client secret //android
      webClientId:
        "1029527483193-61m877n2b57nvn7dkku8uev6nvfblk64.apps.googleusercontent.com", //stag
      // "232705133608-j3kgkv5jrr2ooe4cc12b2tdbjmbu11kb.apps.googleusercontent.com",//Pord
      iosClientId:
        "1029527483193-5j0s9695u0gevdaighu7igrglumjs9ni.apps.googleusercontent.com", //Stag
      // "232705133608-ekg106bi78r2ql097evqso13s6sklql4.apps.googleusercontent.com",//Prod
      scopes: ["profile", "email"],
    });
    GoogleSignin.hasPlayServices()
      .then((hasPlayService) => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then((userInfo) => {
              resolve(userInfo);
              // LoginWithGoogle_api(userInfo);
              console.log(JSON.stringify(userInfo));
            })
            .catch((e) => {
              reject(e);
              console.log("ERROR IS: " + JSON.stringify(e));
            });
        }
      })
      .catch((e) => {
        reject(e);
        console.log("ERROR IS: " + JSON.stringify(e));
      });
  });
};
