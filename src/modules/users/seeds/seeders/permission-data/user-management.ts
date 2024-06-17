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
  }
];
