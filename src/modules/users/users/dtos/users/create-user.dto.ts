import { IsArray, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({ message: 'username: ຕ້ອງເປັນ string ເທົ່ານັ້ນ' })
    @MaxLength(20, { message: 'username: ບໍ່ສາມາດປ້ອນຕົວອັກສອນຫຼາຍກວ່າ 20 ຕົວ' })
    @IsNotEmpty({ message: 'username: ກະລຸນາປ້ອນຊື່ຜູ້ນຳໃຊ້' })
    username: string;

    @IsString({ message: 'phone_number: ຕ້ອງເປັນ string ເທົ່ານັ້ນ' })
    @IsNotEmpty({ message: 'phone_number: ກະລຸນາປ້ອນເບີໂທ' })
    phone_number: string;

    @IsString({ message: 'password: ຕ້ອງເປັນ string ເທົ່ານັ້ນ' })
    @MaxLength(20, { message: 'password: ບໍ່ສາມາດປ້ອນຕົວອັກສອນຫຼາຍກວ່າ 20 ຕົວ' })
    @IsNotEmpty({ message: 'password: ກະລຸນາປ້ອນລະຫັດຜ່ານ' })
    password: string;
    @IsString({ message: 'confirm_password: ຕ້ອງເປັນ string ເທົ່ານັ້ນ' })
    @MaxLength(20, { message: 'confirm_password: ບໍ່ສາມາດປ້ອນຕົວອັກສອນຫຼາຍກວ່າ 20 ຕົວ' })
    @IsNotEmpty({ message: 'confirm_password: ກະລຸນາປ້ອນຢືນຢັນລະຫັດຜ່ານ' })
    confirm_password: string;

    @IsString({ message: 'first_name: ຕ້ອງເປັນ string ເທົ່ານັ້ນ' })
    @MaxLength(30, { message: 'first_name: ບໍ່ສາມາດປ້ອນຕົວອັກສອນຫຼາຍກວ່າ 30 ຕົວ' })
    first_name: string;
    @IsString({ message: 'last_name: ຕ້ອງເປັນ string ເທົ່ານັ້ນ' })
    @MaxLength(30, { message: 'last_name: ບໍ່ສາມາດປ້ອນຕົວອັກສອນຫຼາຍກວ່າ 30 ຕົວ' })
    last_name: string;
    @IsString({ message: 'position: ຕ້ອງເປັນ string ເທົ່ານັ້ນ' })
    @MaxLength(200, { message: 'position: ບໍ່ສາມາດປ້ອນຕົວອັກສອນຫຼາຍກວ່າ 200 ຕົວ' })
    position: string;
    @IsString({ message: 'photo_key: ຕ້ອງເປັນ string ເທົ່ານັ້ນ' })
    photo_key: string;

    @IsArray({ message: 'role_ids: ຕ້ອງເປັນ array' })
    @IsNumber(
      {},
      { each: true, message: 'ຕ້ອງເປັນຕົວເລກ' },
    )
    role_ids: number[];
  
}
