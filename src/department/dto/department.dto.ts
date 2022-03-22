import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class DepartmentDto {
  @IsNotEmpty()
  name: string;

  @IsString()
  location: string;
}
