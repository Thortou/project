import { Body, Controller, Post } from "@nestjs/common";
import { BodyDto, bodyEnum } from "./dtos/create-learn-validation.dto";
import { PermissionName } from "../../common/enum/permission-enum";
import { Permissions } from "../../common/decorators/permission.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller('validation')
export class LearnValidationController {
    constructor(){}

    @Permissions(PermissionName.WRITE_USER)
    @Post()
    async testEnum(@Body() body: BodyDto) {
        console.log(Object.values(bodyEnum));
        
    }
}