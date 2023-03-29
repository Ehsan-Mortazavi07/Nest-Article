import { IsEmail, IsString, Length, ValidateIf } from 'class-validator';

export class EditUserDto {
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;


  @IsString()
  @Length(5, 999, { message: 'پسورد حداقل باید 5 کاراکتر باشد' })
  @ValidateIf((object, value) => value !== null)
  password: string | null;
}
