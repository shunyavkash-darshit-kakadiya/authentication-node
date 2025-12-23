export function setCookie(res, name, value, options = {}) {
  const defaultOptions = {
    httpOnly: true,
    sameSite: 'none',
    secure: true
  };

  const cookieOptions = { ...defaultOptions, ...options };

  res.cookie(name, value, cookieOptions);
}
