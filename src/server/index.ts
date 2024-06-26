import express from "express";

import { routeAdapter } from "./adapters/routeAdapter";

import { makeAuthenticationMiddleware } from "../factories/makeAuthenticationMiddleware";
import { makeAuthorizationMiddleware } from "../factories/makeAuthorizationMiddleware";
import { makeListLeadsController } from "../factories/makeListLeadsController";
import { makeSignInController } from "../factories/makeSignInController";
import { makeSignupController } from "../factories/makeSignUpController";
import { middlewareAdapter } from "./adapters/middlewareAdapter";

const app = express();

app.use(express.json());

app.post("/sign-up", routeAdapter(makeSignupController()));
app.post("/sign-in", routeAdapter(makeSignInController()));

app.get(
  "/leads",
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(["leads:read"])),
  routeAdapter(makeListLeadsController())
);

app.post(
  "/leads",
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(["leads:write"]))
);

app.listen(3001, () => {
  console.log("Server started at http://localhost:3001");
});
