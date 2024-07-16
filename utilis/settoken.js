import jwt from "jsonwebtoken"
const setToken = async (user) => {
  const token = jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return token
};
export default setToken