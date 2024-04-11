const StrengthChecker = (password: string) => {
  const passwordLength = password.length;

  switch (true) {
    case passwordLength < 1:
      return "";
    case passwordLength < 4:
      return "Very Weak";
    case passwordLength < 8:
      return "Poor";
    case passwordLength < 12:
      return "Medium";
    case passwordLength < 16:
      return "Strong";
    default:
      return "Very Strong";
  }
};

export default StrengthChecker;
