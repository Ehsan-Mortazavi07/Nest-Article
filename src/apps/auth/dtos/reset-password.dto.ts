import { IsEmail, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;

  @IsString()
  @Length(5, 999, { message: 'پسورد حداقل باید 5 کاراکتر باشد' })
  password: string;
}
