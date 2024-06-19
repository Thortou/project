import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../../command/users/create-user.command";
import { UserService } from "../../../user.service";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { hash } from "bcrypt"
import { ProfileEntity } from "src/modules/users/entities/profile.entity";
import { UniqueIDService } from "src/common/utils/generate-unique-id";
import { IFileUpload } from "src/infrastructure/ports/file-upload/file-upload.interface";
import { Inject } from "@nestjs/common";
import { FILE_UPLOAD_SERVICE } from "src/infrastructure/adapters/file-upload/inject-key";
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly userService: UserService,
        private readonly _uniqueIdService: UniqueIDService,
        @Inject(FILE_UPLOAD_SERVICE)
        private readonly _uploadService: IFileUpload
    ) { }
    async execute({ input, file }: CreateUserCommand): Promise<any> {

        const check_phone = await this.userService.getOne(input.phone_number, 'phone')
        const exitsUsername = await this.userService.getOne(input.username, 'username');
       
        if (exitsUsername) {
            return { status: 500, message: 'ຜູ້ໃຊ້ນີ້ມີໃນລະບົບແລ້ວ' }
        }
        if (check_phone) {
            return { status: 500, message: 'ເບີໂທນີ້ມີໃນລະບົບແລ້ວ' }
        }
        
        if (input.confirm_password !== input.password) {
            return { status: 500, message: 'ຢືນຢັນລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ' }
        }
        let photo_name: string | undefined;
        if (file) {
            photo_name = await this._uploadService.upload('/profile', file.buffer, file.originalname)
        }

        const entity = new UserEntity()
        entity.notification_topic = await this._uniqueIdService.generateUniqueID(
            10,
            'alpha_numeric',
            UserEntity,
            'users',
            'notification_topic',
        );

        const id = input.role_ids.replace(/^\[|\]$/g, '').split(',').map(val => parseInt(val.trim(), 10))
        entity.username = input.username;
        entity.phone = input.phone_number;
        entity.password = await hash(input.password, 10);
        entity.roles = await this.userService.getRoles(id);
        //profile
        const user_profile = new ProfileEntity()
        user_profile.first_name = input.first_name;
        user_profile.last_name = input.last_name;
        user_profile.position = input.position;
        user_profile.photo_key = photo_name;
        entity.profile = user_profile

        const user = await this.userService.create(entity);
        return user
    }

}