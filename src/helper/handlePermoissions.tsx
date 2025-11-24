import RNPermissions, { openSettings, RESULTS } from "react-native-permissions";

const handlePermissions = (permission: any, info: any) => {
  return new Promise((resolve, reject) => {
    RNPermissions.check(permission)
      .then((permissionCheck: any) => {
        console.log("check permissions=-===>", permissionCheck);
        if (permissionCheck === RESULTS.UNAVAILABLE) {
          // Alert.alert(`${info} Permission unavailable`);
          reject("PERMISSION UNAVAILABLE");
        } else if (permissionCheck === RESULTS.LIMITED) {
          // Alert.alert(`${info} Permission unavailable`);
          // reject('PERMISSION LIMITED')
          // openLimitedPhotoLibraryPicker().then(()=>{
          //     resolve('limited');
          // }).catch(() => {
          //     console.warn('Cannot open photo library picker');
          //   });
          resolve("granted");
        } else {
          if (permissionCheck === RESULTS.GRANTED) {
            resolve("granted");
          } else if (permissionCheck === RESULTS.DENIED) {
            RNPermissions.request(permission)
              .then((permissionRequest: any) => {
                if (permissionRequest === RESULTS.GRANTED) {
                  resolve("granted");
                } else {
                  // Alert.alert(`${info} Permission unavailable`);
                }
              })
              .catch((err: any) => reject(err));
            // openSettings().then((res)=>{
            //     console.log('res',res)
            //     // resolve('granted')
            // }).catch(() => console.warn('cannot open settings'));
          }
          if (permissionCheck === RESULTS.BLOCKED) {
            reject("PERMISSION UNAVAILABLE");
          }
        }
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export default handlePermissions;
