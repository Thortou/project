export enum PermissionName {
    READ_USER = 'READ_USER',
    WRITE_USER = 'WRITE_USER',
    UPDATE_USER = 'UPDATE_USER',
    DELETE_USER = 'DELETE_USER',

    //permission for role
    READ_ROLE = 'READ_ROLE',
    WRITE_ROLE = 'WRITE_ROLE',
    UPDATE_ROLE = 'UPDATE_ROLE',
    DELETE_ROLE = 'DELETE_ROLE',
    //permission for role
    READ_PERMISSION = 'READ_PERMISSION',
}

export enum PermissionType {
    UserManagement = 'user managent',
    RoleManagement = 'role managent',
   PermissionManagement = 'permission managent',
}

export enum PermissionDisplayName {
    UserRead = 'ອ່ານຂໍ້ມູນຜູ້ໃຊ້',
    UserWrite = 'ສ້າງຂໍ້ມູນຜູ້ໃຊ້',
    UserUpdate = 'ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້',
    UserDelete = 'ລົບຂໍ້ມູນຜູ້ໃຊ້',

    RoleRead = 'ອ່ານຂໍ້ມູນບົດບາດ',
    RoleWrite = 'ສ້າງຂໍ້ມູນບົດບາດ',
    RoleUpdate = 'ແກ້ໄຂຂໍ້ມູນບົດບາດ',
    RoleDelete = 'ລົບຂໍ້ມູນບົດບາດ',

    PermissionRead = 'ອ່ານຂໍ້ມູນສິດທີ',
}