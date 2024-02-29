import { SignUpController } from "../application/controllers/SignUpController";
import { makeSignupUseCase } from "./makeSignUpUseCase";

export function makeSignupController() {
  const signUpUseCase = makeSignupUseCase();

  return new SignUpController(signUpUseCase);
}
