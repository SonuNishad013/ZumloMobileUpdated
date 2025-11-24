const maskedMobile = (mobile: any) => {
  let subNum = mobile?.slice(10 - 2);
  return (subNum = `XXXXXXXX${subNum}`);
};

export default maskedMobile;
