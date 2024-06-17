
import { HttpStatus, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { compare } from 'bcrypt';
import { UserLoginCommand } from '../../command/user-auth/user-login.command';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserService } from '../../../user.service';

@CommandHandler(UserLoginCommand)
export class UserLoginHandler
  implements ICommandHandler<UserLoginCommand, UserEntity | null>
{
  constructor(
    private readonly _repository: UserService,
  ) {}

  async execute({ username, password }: UserLoginCommand): Promise<UserEntity> {
    const user = await this._repository.getOne(username, 'username');


    if (!user)
      throw new NotFoundException(
        'this user is not in database');

    if (!user.verify_at)
      throw new UnauthorizedException('ACCOUNT_IS_NOT_VERIFIED');

    const isMatch = await compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Incorrect password!');

    return user;
  }
}
