import { verify } from "jsonwebtoken";
import { env } from "../config/env";
import {
  IData,
  IMiddleware,
  IRequest,
  IResponse,
} from "../interfaces/IMiddleware";

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers;

    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          error: "Invalid access token. ",
        },
      };
    }

    try {
      verify(authorization, env.JWT);
      return {
        data: {
          accountId: "123",
        },
      };
    } catch (error) {
      return {
        statusCode: 401,
        body: {
          error: "Invalid access token. ",
        },
      };
    }
  }
}
