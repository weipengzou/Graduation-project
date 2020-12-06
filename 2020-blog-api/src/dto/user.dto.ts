import { ApiProperty } from '@nestjs/swagger'
class UserDto {
  @ApiProperty()
  account: string
  @ApiProperty()
  password: string
}
export { UserDto }
