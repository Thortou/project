
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { UserGenerateCommand } from '../../command/user-auth/user-generate.command';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserService } from '../../../user.service';
import { TokenPayload } from 'src/common/interface/token-payload.interface';
import { GetDetailUserQuery } from '../../../queries/queries/detail-user.query';

@CommandHandler(UserGenerateCommand)
export class GenerateTokenHandler
    implements
    ICommandHandler<
        UserGenerateCommand,
        { accessToken: string; user: UserEntity }
    > {
    constructor(
        private readonly _jwt: JwtService,
        private readonly _repository: UserService,
        private readonly _queryBus: QueryBus,
    ) { }

    async execute({
        user,
    }: UserGenerateCommand): Promise<{ accessToken: string; user: UserEntity }> {
        const payload: TokenPayload = {
            sub: user.id,
            username: user.username,
            timestamp: new Date().getTime(),
        };

        const token = this._jwt.sign(payload);

        const userEntity = await this._repository.getOne(user.id, 'id');

        userEntity.access_token = await hash(JSON.stringify(payload), 10);
        await this._repository.update(userEntity.id, userEntity);
        const userResult = await this._queryBus.execute<
            GetDetailUserQuery,
            UserEntity
        >(new GetDetailUserQuery(user.id));

        return { accessToken: token, user: userResult };
    }
}
