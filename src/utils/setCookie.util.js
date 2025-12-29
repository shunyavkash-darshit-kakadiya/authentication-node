export function setCookie(res, name, value, options = {}) {
  const defaultOptions = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  // const isProd = process.env.NODE_ENV === "production";

  // const defaultOptions = {
  //   httpOnly: true,
  //   sameSite: isProd ? "none" : "lax",
  //   secure: isProd,
  // };

  const cookieOptions = { ...defaultOptions, ...options };

  res.cookie(name, value, cookieOptions);
}
