const maskedEmail = (email: any) => {
  let emailMaskedfirst = email?.substring(0, 1);
  let emailMaskedLast = email?.split("@")[1];
  // let emailMaskedLast = email?.slice(email?.length - 10);
  let maskEmail = `${emailMaskedfirst}****@${emailMaskedLast}`;
  return maskEmail;
};

export default maskedEmail;
