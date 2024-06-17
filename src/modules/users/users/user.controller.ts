import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UserEntity } from "../entities/user.entity";
import { UserGenerateCommand } from "./commands/command/user-auth/user-generate.command";
import { GetDetailUserQuery } from "./queries/queries/detail-user.query";
import { LocalAuthGuard } from "src/common/guards/local-auth.guard";
import { PermissionName } from "../../../common/enum/permission-enum";
import { Permissions } from "../../../common/decorators/permission.decorator"
import { Public } from "src/common/decorators/public.decorator";
import { CreateUserDto } from "./dtos/users/create-user.dto";
import { CreateUserCommand } from "./commands/command/users/create-user.command";
import { VerifyUserCommand } from "./commands/command/users/verify-user.command";
import { VerifyOTPOnFirebaseMiddleware } from "../../../common/middleware/verify-otp.middleware";
import { ChangePasswordUserDto } from "./dtos/users/change-password.user.dto";
import { ChangePasswordUserCommand } from "./commands/command/users/change-password-user.command";

@Controller('users')
export class UserController {
    constructor(
        private readonly _commandBus: CommandBus,
        private readonly _queryBus: QueryBus
    ) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: Request): Promise<any> {
        const { accessToken, user } = await this._commandBus.execute<
            UserGenerateCommand, { accessToken: string, user: UserEntity }
        >(new UserGenerateCommand(req['user']))

        return {
            message: 'login success',
            auth_token: accessToken,
            data: user
        }
    }

    @Post('create')
    async create(@Body() input: CreateUserDto) {
        const data = await this._commandBus.execute<CreateUserCommand, UserEntity>(new CreateUserCommand(input));
        return data
    }

    @Permissions(PermissionName.UPDATE_USER)
    @Put('verify/:id')
    async verify(@Param('id') id: number) {
        const data = await this._commandBus.execute<VerifyUserCommand, UserEntity>(new VerifyUserCommand(id));
        return data
    }

    @Permissions(PermissionName.READ_USER)
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<UserEntity> {
        return await this._queryBus.execute<GetDetailUserQuery, UserEntity>(new GetDetailUserQuery(id))
    }

    //change password user
    // @Public()
    @Permissions(PermissionName.UPDATE_USER)
    @Post('change-password')
    @UseGuards(VerifyOTPOnFirebaseMiddleware)
    async changePassword(@Body() body: ChangePasswordUserDto, @Request() request): Promise<any> {
        const user = request.user;
        const result = await this._commandBus.execute<ChangePasswordUserCommand> (new ChangePasswordUserCommand(user, body ))
        return result
    }
}