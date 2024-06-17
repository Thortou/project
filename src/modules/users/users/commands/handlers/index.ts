import { GenerateTokenHandler } from "./user-auth/user-generate.handler";
import { UserLoginHandler } from "./user-auth/user-login.handler";
import { ValidateTokenPayloadHandler } from "./user-auth/validate-toke-payload.handler";
import { ChangePasswordUserHandler } from "./users/change-password.user.handler";
import { CreateUserHandler } from "./users/create-user.handler";
import { VerifyUserHandler } from "./users/verify-user.handler";

export const userHandlers = [
    UserLoginHandler,
    GenerateTokenHandler,
    ValidateTokenPayloadHandler,
    CreateUserHandler,
    VerifyUserHandler,
    ChangePasswordUserHandler
]