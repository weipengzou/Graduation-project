import { ApiProperty } from '@nestjs/swagger'

class GetArticleDto {
  @ApiProperty({
    required: false,
  })
  id: string
  @ApiProperty({
    required: false,
  })
  page?: number
  @ApiProperty({
    required: false,
  })
  number?: number
}
export { GetArticleDto }
