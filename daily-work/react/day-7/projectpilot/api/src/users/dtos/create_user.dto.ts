import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  @IsOptional()
  password: string;
  refreshToken?: string;
}
