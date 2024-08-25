import { Module } from "@nestjs/common";
import { userHandlers } from "./commands/handlers";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { strategies } from "../auth";
import { queryUser } from "./queries/handlers";
import { UniqueIDService } from "src/common/utils/generate-unique-id";

@Module({
    
    controllers: [UserController],
    providers: [
        ...userHandlers,
        UserService,
        UniqueIDService,
        ...strategies,
        ...queryUser
    ],
    exports: [UserService]
})
export class UserModule {}