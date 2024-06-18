import { PermissionDisplayName, PermissionName, PermissionType } from "../../../../../common/enum/permission-enum";

export const userManagemenGroups = [
  {
    id: 1,
    name: PermissionName.READ_USER,
    description: 'read user data',
    type: PermissionType.UserManagement,
    display_name: PermissionDisplayName.UserRead,
  },
  {
    id: 2,
    name: PermissionName.WRITE_USER,
    description: 'create user data',
    type: PermissionType.UserManagement,
    display_name: PermissionDisplayName.UserWrite,
  },
  {
    id: 3,
    name: PermissionName.UPDATE_USER,
    description: 'update user data',
    type: PermissionType.UserManagement,
    display_name: PermissionDisplayName.UserUpdate,
  },
  {
    id: 4,
    name: PermissionName.DELETE_USER,
    description: 'delete user data',
    type: PermissionType.UserManagement,
    display_name: PermissionDisplayName.UserDelete,
  },
  {
    id: 5,
    name: PermissionName.READ_ROLE,
    description: 'read role data',
    type: PermissionType.RoleManagement,
    display_name: PermissionDisplayName.RoleRead,
  },
  {
    id: 6,
    name: PermissionName.WRITE_ROLE,
    description: 'write role data',
    type: PermissionType.RoleManagement,
    display_name: PermissionDisplayName.RoleWrite,
  },
  {
    id: 7,
    name: PermissionName.UPDATE_ROLE,
    description: 'update role data',
    type: PermissionType.RoleManagement,
    display_name: PermissionDisplayName.RoleUpdate,
  },
  {
    id: 8,
    name: PermissionName.DELETE_ROLE,
    description: 'delete role data',
    type: PermissionType.RoleManagement,
    display_name: PermissionDisplayName.RoleDelete,
  },
  {
    id: 9,
    name: PermissionName.READ_PERMISSION,
    description: 'read permission data',
    type: PermissionType.PermissionManagement,
    display_name: PermissionDisplayName.PermissionRead,
  },
];
