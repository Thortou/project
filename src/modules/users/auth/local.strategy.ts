import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserEntity } from "../entities/user.entity";
import { UserLoginCommand } from "../users/commands/command/user-auth/user-login.command";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _commandBus: CommandBus) {
    super();
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    return await this._commandBus.execute<UserLoginCommand, UserEntity>(
      new UserLoginCommand(username, password),
    );
  }
}