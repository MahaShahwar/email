import express, { Request, Response } from "express";
import passport from "passport";

export const userRouter = express.Router();

userRouter.get(
  "/user/login",
  passport.authenticate("azuread-openidconnect", { failureRedirect: "/" })
);

userRouter.get(
  "/user/callback",
  passport.authenticate("azuread-openidconnect", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    res.redirect("/success");
  }
);

userRouter.get("/success", (req: Request, res: Response) => {
  res.send("Login successful!");
});
