import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 999, { message: 'پسورد حداقل باید 5 کاراکتر باشد' })
  password: string;
}
