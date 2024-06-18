import { CreateRoleHandler } from "./create-role.handler";
import { DeleteRoleHandler } from "./delete-role.handler";
import { UpdeateRoleHandler } from "./update-role.handler";

export const roleHandlers = [
    CreateRoleHandler,
    UpdeateRoleHandler,
    DeleteRoleHandler
]