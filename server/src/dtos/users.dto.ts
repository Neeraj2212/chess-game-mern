import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public userName: string;

  @IsString()
  public password: string;
}
