export const getUser = () => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("sentinel_user");
    if (userStr) return JSON.parse(userStr);
  }
  return null;
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === "admin";
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("sentinel_user");
    localStorage.removeItem("sentinel_session");
    window.location.href = "/login";
  }
};
