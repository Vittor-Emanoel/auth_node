import { SignInUseCase } from "../application/useCases/SignInUseCase";

export function makeSigninUseCase() {
  return new SignInUseCase();
}
