import { Module } from "@nestjs/common";
import { LearnValidationController } from "./learn-validation.controller";

@Module({
    controllers: [LearnValidationController]
})
export class LearnModule {}