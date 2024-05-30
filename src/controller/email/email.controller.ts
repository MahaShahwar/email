import express, { Request, Response } from "express";
import { User } from "../../utils/interfaces/user/login.interface";
import { syncEmails } from "../../service/email/email.service";

export const emailSyncRouter = express.Router();

emailSyncRouter.post("/sync-emails", async (req: Request, res: Response) => {
  const user: User = req.body;
  try {
    await syncEmails(user);
    res.status(200).send("Emails synchronized successfully.");
  } catch (error) {
    res.status(500).send("Error synchronizing emails.");
  }
});
