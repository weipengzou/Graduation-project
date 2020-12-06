import { ApiProperty } from '@nestjs/swagger';
export class RegisterDto {
  @ApiProperty()
  account: string;
  @ApiProperty()
  password: string;
}
