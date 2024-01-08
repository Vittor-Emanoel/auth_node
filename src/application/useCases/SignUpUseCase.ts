// eslint-disable-next-line quotes
import { hash } from "bcryptjs";
import { AccountAlreadyExistsError } from "../errors/AccountAlreadyExists";
import { prismaClient } from "../libs/prisma";

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  async execute({ name, password, email }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await prismaClient.account.findUnique({
      where: {
        email,
      },
    });

    if (accountAlreadyExists) {
      throw new AccountAlreadyExistsError();
    }

    const hashedPassword = await hash(password, 8);

    await prismaClient.account.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  }
}
