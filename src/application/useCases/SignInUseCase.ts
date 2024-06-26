import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { env } from "../config/env";
import { InvalidCredentials } from "../errors/InvalidCredentials";
import { prismaClient } from "../libs/prisma";

interface IInput {
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

    const accessToken = sign(
      { sub: account.id, role: account.roleId },
      env.jwtSecret,
      {
        expiresIn: "1d",
      }
    );

    return {
      accessToken,
    };
  }
}
