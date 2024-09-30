import cookieParser from "cookie-parser";  //Parses cookies in the incoming request.
import cors from "cors"; //Enables Cross-Origin Resource Sharing, allowing communication between different domains (used for front-end and back-end interaction).
import dotenv from "dotenv"; // Loads environment variables
import express from "express"; // building the server.
import morgan from "morgan"; //A middleware that logs HTTP requests for debugging.
import dbConnection from "./utils/index.js";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js"; // Custom middleware for error handling
import routes from "./routes/index.js";



dotenv.config();

dbConnection(); // database connection
const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: ["http//localhost:3000", "http//localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    CredentialS: true, //sending cookies or authorization headers.
  })
);

app.use(express.json()); // parses json req
app.use(express.urlencoded( {extended : true})); //parses URL-encoded data (useful for form submissions).
app.use(cookieParser()); //middleware parses cookies attached to incoming requests and makes them available under req.cookies
app.use(morgan("dev"));
app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
