import bcrypt from "bcrypt";
const saltRounds = 12;

//User Registration or Password Update
export function createHashPwd(password) {
  return bcrypt.hashSync(password, saltRounds);
}

//User Login, Password Re-verification, Multi-factor Authentication
export function comparePwd(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
