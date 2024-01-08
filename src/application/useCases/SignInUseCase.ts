// eslint-disable-next-line quotes
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { InvalidCredentials } from "../errors/InvalidCredentials";
import { prismaClient } from "../libs/prisma";

interface IInput {
  name: string;
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
}

export class SignInUseCase {
  async execute({ password, email }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: {
        email,
      },
    });

    if (!account) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign({ sub: account.id }, process.env.JWT_SECRET!);

    return {
      accessToken,
    };
  }
}
