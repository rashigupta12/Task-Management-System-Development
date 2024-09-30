import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("DB connection established");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};


// createJWT function generates a JWT and stores it in a cookie on the response (res).
export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d", //The token is set to expire in 1 day
  });

  // Change sameSite from strict to none when you deploy your app
  res.cookie("token", token, {
    httpOnly: true,  //  Prevents client-side JavaScript from accessing the cookie, enhancing security.
    secure: process.env.NODE_ENV !== "development",  //Ensures the cookie is sent over HTTPS in production, but allows HTTP in development.
    sameSite: "strict", //prevent CSRF attack
    maxAge: 1 * 24 * 60 * 60 * 1000, //1 day cookie's lifespan
  });
};

export default dbConnection;