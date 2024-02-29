import { SignInController } from "../application/controllers/SignInController";
import { makeSigninUseCase } from "./makeSignInUseCase";

export function makeSignInController() {
  const signInUseCase = makeSigninUseCase();

  return new SignInController(signInUseCase);
}
