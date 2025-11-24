import appleAuth from "@invertase/react-native-apple-authentication";

let user: string | null = null;

  /**
   * Fetches the credential state for the current user, if any, and updates state on completion.
   */
  async function fetchAndUpdateCredentialState(
    updateCredentialStateForUser: any
  ) {
    if (user === null) {
      updateCredentialStateForUser("N/A");
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        updateCredentialStateForUser("AUTHORIZED");
      } else {
        updateCredentialStateForUser(credentialState);
      }
    }
  }

export   function loginWithApple() {
    console.warn("Beginning Apple Authentication");

   return new Promise( async (resolve,reject)=>{
     // start a login request
     try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
  
        console.log("appleAuthRequestResponse", appleAuthRequestResponse);
  
        const {
          user: newUser,
          email,
          nonce,
          identityToken,
          realUserStatus /* etc */,
        } = appleAuthRequestResponse;
  
        user = newUser;
  
        fetchAndUpdateCredentialState(-1).catch(
          (error) => console.log(`Error: ${error.code}`)
        );

        if (identityToken) {
            resolve(appleAuthRequestResponse)
          // LoginWithApple_api(appleAuthRequestResponse);
          // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
          // console.log(nonce, identityToken);
        } else {
          // no token - failed sign-in?
        }
  
        if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
          console.log("I'm a real person!");
        }
  
        console.warn(`Apple Authentication Completed, ${user}, ${email}`);
      } catch (error: any) {
        reject(error.code)
        if (error.code === appleAuth.Error.CANCELED) {
          console.warn("User canceled Apple Sign in.");
        } else {
          console.error(error);
        }
      }
   })
  }
