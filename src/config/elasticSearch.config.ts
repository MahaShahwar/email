import passport from "passport";
import {
  OIDCStrategy,
  IProfile,
  VerifyCallback,
} from "passport-azure-ad";
import dotenv from "dotenv";
import { esClient } from "../models/user.index";
import { User } from "../utils/interfaces/user/login.interface";

dotenv.config();
const oidcOptions: any = {
  identityMetadata: `https://login.microsoftonline.com/${process.env.TENANT_ID}/.well-known/openid-configuration`,
  clientID: process.env.CLIENT_ID!,
  responseType: "code",
  responseMode: "query",
  redirectUrl: process.env.REDIRECT_URI,
  clientSecret: process.env.CLIENT_SECRET,
  validateIssuer: false,
  passReqToCallback: true,
  scope: ["profile", "offline_access", "email"],
  useCookieInsteadOfSession: false,
  loggingLevel: "info",
};
const callbackFunction: any = async (
  _req: Request,
  _iss: string,
  _sub: string,
  profile: IProfile,
  access_token: string,
  refresh_token: string,
  done: VerifyCallback
) => {
  try {
    const user: User = {
      id: profile.oid,
      email: profile._json.preferred_username,
      name: profile._json.name,
      accessToken: access_token,
      refreshToken: refresh_token,
    };

    // Save the user details and tokens to Elasticsearch
    await esClient.index({
      index: "users",
      id: user.id,
      body: user,
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
};
passport.use(new OIDCStrategy(oidcOptions, callbackFunction));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});
