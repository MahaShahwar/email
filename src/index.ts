import express from "express";
import passport from "passport";
import "./config/elasticSearch.config";
import { userRouter } from "./controller/user/user.controller";
import { emailSyncRouter } from "./controller/email/email.controller";
import session from "express-session";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(userRouter);
app.use(emailSyncRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
