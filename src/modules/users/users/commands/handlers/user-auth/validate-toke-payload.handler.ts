
import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { compare } from 'bcrypt';
import { ValidateTokenPayloadCommand } from '../../command/user-auth/validate-token-payload.command';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { GetDetailUserQuery } from '../../../queries/queries/detail-user.query';

@CommandHandler(ValidateTokenPayloadCommand)
export class ValidateTokenPayloadHandler
  implements ICommandHandler<ValidateTokenPayloadCommand, UserEntity>
{
  constructor(private readonly _queryBus: QueryBus) {}

  async execute({ payload }: ValidateTokenPayloadCommand): Promise<UserEntity> {
    const user = await this._queryBus.execute<GetDetailUserQuery, UserEntity>(
      new GetDetailUserQuery(payload.sub),
    );

    if (!user || !user.access_token)
      throw new UnauthorizedException(
        'LOGIN_FIRST');

    const isMatch = await compare(JSON.stringify(payload), user.access_token);

    if (!isMatch)
      throw new UnauthorizedException(
        'LOGGED_OUT'
      );

    if (!user.verify_at)
      throw new UnauthorizedException(
        'ACCOUNT_IS_NOT_VERIFIED'
      );

    if (!user.is_active) {
      throw new UnauthorizedException(
        'ACCOUNT_IS_BLOCKED'
      );
    }

    return user;
  }
}
