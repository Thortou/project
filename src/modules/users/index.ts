import { PermissionModule } from "./permissions/permission.module";
import { RoleModules } from "./roles/role.module";
import { UserModule } from "./users/user.module";

export const userModules = [
    UserModule, RoleModules, PermissionModule
]