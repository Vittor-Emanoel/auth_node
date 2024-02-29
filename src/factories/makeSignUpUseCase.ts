import { SignUpUseCase } from "../application/useCases/SignUpUseCase";

export function makeSignupUseCase() {
  const SALT = 10;

  return new SignUpUseCase(SALT);
}
