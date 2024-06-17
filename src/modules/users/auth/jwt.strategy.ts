import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandBus } from "@nestjs/cqrs";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IEnv } from "src/common/interface/env.interface";
import { UserEntity } from "../entities/user.entity";
import { ValidateTokenPayloadCommand } from "../users/commands/command/user-auth/validate-token-payload.command";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _config: ConfigService<IEnv>,
    private readonly _commandBus: CommandBus,
    // private readonly _cls: ClsService<ICls>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<UserEntity> {
    delete payload.iat;
    delete payload.exp;

    // this._cls.set('userId', payload.sub);

    return await this._commandBus.execute<
      ValidateTokenPayloadCommand,
      UserEntity
    >(new ValidateTokenPayloadCommand(payload));
  }
}
