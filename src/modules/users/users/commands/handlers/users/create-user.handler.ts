import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../../command/users/create-user.command";
import { UserService } from "../../../user.service";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { hash } from "bcrypt"
import { ProfileEntity } from "src/modules/users/entities/profile.entity";
import { UniqueIDService } from "src/common/utils/generate-unique-id";
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly userService: UserService,
        private readonly _uniqueIdService: UniqueIDService
    ) { }
    async execute({ input }: CreateUserCommand): Promise<any> {

        const check_phone = await this.userService.getOne(input.phone_number, 'phone')
        if (check_phone) {
            return { status: 500, message: 'ເບີໂທນີ້ມີໃນລະບົບແລ້ວ' }
        }
        if (input.confirm_password !== input.password) {
            return { status: 500, message: 'ຢືນຢັນລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ' }
        }

        const entity = new UserEntity()
        entity.notification_topic = await this._uniqueIdService.generateUniqueID(
            10,
            'alpha_numeric',
            UserEntity,
            'users',
            'notification_topic',
        );
        entity.username = input.username;
        entity.phone = input.phone_number;
        entity.password = await hash(input.password, 10);
        entity.roles = await this.userService.getRoles(input.role_ids);
        //profile
        const user_profile = new ProfileEntity()
        user_profile.first_name = input.first_name;
        user_profile.last_name = input.last_name;
        user_profile.position = input.position;
        user_profile.photo_key = input.first_name;
        entity.profile = user_profile

        const user = await this.userService.create(entity);
        return user
    }

}