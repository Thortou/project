
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDetailUserQuery } from '../queries/detail-user.query';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserService } from '../../user.service';

@QueryHandler(GetDetailUserQuery)
export class GetDetailUserRepository implements IQueryHandler<GetDetailUserQuery> {

  constructor(
    private readonly _userservice: UserService
  ) {}

  async execute({ id }: GetDetailUserQuery): Promise<UserEntity> {
    const res = await this._userservice.getOne(id, 'id')

    return res
  }
}
