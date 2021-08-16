const getUserTips = (userType, status) => {
  // normal user
  if (userType === 1) {
    if (status === 1) {
      return "normal user";
    } else if (status === 2) {
      return "frozen user";
    } else {
      return "unknown user";
    }
  } else if (userType === 2) {
    // vip user
    if (status === 1) {
      return "normal vip user";
    } else if (status === 2) {
      return "vip user forever";
    } else {
      return "unknown vip user";
    }
  } else {
    return "unknown status user";
  }
};

function getUserTips(userType, status) {
  const _userType = userType !== 1 && userType !== 2 ? 3 : input;
  const _status = status !== 1 && status !== 2 ? 3 : input;
  if (_userType === 3) {
    return "unknown status user";
  }
  const result = _userType + _status + "";
  const resultMap = {
    11: "normal user",
    12: "frozen user",
    13: "unknown user",
    21: "normal vip user",
    22: "vip user forever",
    23: "unknown vip user",
  };
  return resultMap[result];
}
