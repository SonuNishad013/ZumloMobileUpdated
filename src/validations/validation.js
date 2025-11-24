module.exports.emailCheck = (email) => {
  const validation =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validation.test(email);
};

module.exports.passwordCheck = (password) => {
  var num =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^()_-])[A-Za-z\d@$!%*?&#^()_-]{8,}$/; //password must include alphnumeric, both uppercase and lowercase , minimum 7 and maximum 14 characters
  return num.test(password);
};
// strong pwd
module.exports.validatePassword = (password) => {
  var pwd =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_-])[A-Za-z\d@$!%*?&#^()_-]{7,20}$/;
  return pwd.test(password);
};
// for Upper case
module.exports.validateUpperCasePassword = (password) => {
  var pwd = /^(.*[A-Z].*)$/;
  return pwd.test(password);
};
// for small case
module.exports.validateSmallCasePassword = (password) => {
  var pwd = /^(.*[a-z].*)$/;
  return pwd.test(password);
};
// for numaric case
module.exports.validateNumaricPassword = (password) => {
  var pwd = /^(.*[0-9].*)$/;
  return pwd.test(password);
};
// for symbol
module.exports.validateSymbollPassword = (password) => {
  var pwd = /^(.*[@$!%*?&#^()_-].*)$/;
  return pwd.test(password);
};
module.exports.validatePhoneNumber = (userMobile) => {
  console.log("vfdjgvfjdgyhfjghjdf", userMobile);
  // var phn = /^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/;
  return /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{10,14}$/gi.test(
    userMobile
  );
  // return phn.test(userMobile);
};
module.exports.validateName = (name) => {
  var names = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  return names.test(name);
};
module.exports.validateNumberOfChildren = (value) => {
  console.log("value", value);
  var textcheck = /^[a-zA-Z][a-zA-Z ]*$/;
  return textcheck.test(value);
};
module.exports.validateAge = (name) => {
  var names = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
  return names.test(name);
};
module.exports.PinCodeCheck = (value) => {
  let regEx = /^[1-9][0-9]+$/;
  return regEx.test(value);
};
module.exports.AddressCheck = (val) => {
  const validation = /^[a-zA-Z0-9/s,.'-]+$/; // added from existing partner App
  return validation.test(val);
};
module.exports.TitleRegex = (val) => {
  const pattern = /^[a-zA-Z" "\s’`,.?"‘':*&%#`?@!&:-]*$/;
  return pattern.test(val);
};

// module.exports.NotEmojiAllow = (val) => {
//   const validation =/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu
//   return validation.test(val);
// }

// Common function to filter out emojis from a string
module.exports.filterEmojis = (input) => {
  const emojiRegex =
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu;
  return input?.replace(emojiRegex, "");
};

module.exports.usernameCheck = (val) => {
  const validation = /^[a-zA-Z0-9_@]*$/; // added from existing partner App
  return validation.test(val);
};

module.exports.isEveryWordNumeric = (val) => {
  const validation = /^\d+(\s+\d+)*$/;
  return validation?.test(val);
};

//used like
// if (val.trim() !== null && (emailCheck(val))) {
//     setEmailAddressError(false);
//     setEmailAddressComplete(true);
// } else {
//     setEmailAddressComplete(false);
//     setEmailAddressError(true);
//     setEmailAddressErrorMsg("please enter euin.")
// }

//validations.js
