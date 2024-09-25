export const getUserFromLocalStorage = () => {
  const token = localStorage.getItem("userinfo");
  if (token) {
    const parseUserInfo = JSON.parse(token);
    return parseUserInfo?.token;
  }
  return null;
};
