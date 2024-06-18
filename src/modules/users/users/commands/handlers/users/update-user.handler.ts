import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "../../command/users/update-user.command";
import { UserService } from "../../../user.service";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { UniqueIDService } from "src/common/utils/generate-unique-id";
import { NotFoundException } from "@nestjs/common";


@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        private readonly _userService: UserService,
        private readonly _uniqueIdService: UniqueIDService
    ) { }
    async execute({ id, input }: UpdateUserCommand): Promise<any> {
        const user = await this._userService.getOne(id, 'id')
        if (!user) throw new NotFoundException({ message: 'ຜູ້ໃຊ້ນີ້ ບໍ່ມີ' })
        const entity = new UserEntity()
        entity.notification_topic = await this._uniqueIdService.generateUniqueID(
            10,
            'alpha_numeric',
            UserEntity,
            'users',
            'notification_topic',
        );
        entity.username = input.username;
        entity.roles = await this._userService.getRoles(input.role_ids);
        //profile
        entity.profile.first_name = input.first_name;
        entity.profile.last_name = input.last_name;
        entity.profile.position = input.position;
        entity.profile.photo_key = input.first_name;
        entity.profile = entity.profile

        await this._userService.update(user.id, entity)
    }

}