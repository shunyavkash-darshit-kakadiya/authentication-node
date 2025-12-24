export function cookieParser(req, res, next) {
  const cookies = req.headers.cookie ? req.headers.cookie.split("; ") : [];
  req.cookies = cookies.reduce((acc, cookie) => {
    const [name, value] = cookie.split("=");
    acc[name] = value;
    return acc;
  }, {});
  next();
}
