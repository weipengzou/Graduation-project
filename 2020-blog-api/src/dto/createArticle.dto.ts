import { ApiProperty } from '@nestjs/swagger';

export class createArticleDto {
  @ApiProperty({ description: '文章内容', example: '默认内容' })
  data: string;
  @ApiProperty({ description: '用户信息', example: '默认信息' })
  user: string;
  @ApiProperty({
    description: '前区块hash值',
    example: '9fd97a7f03867175052b30db2a0e6b576ebfd1e5750934c181ff01161da6fc5a',
  })
  previousHash: string;
  @ApiProperty({
    description: '本区块hash值',
    example: '9fd97a7f03867175052b30db2a0e6b576ebfd1e5750934c181ff01161da6fc5a',
  })
  hash: string;
  @ApiProperty({
    description: '腾讯webservice地址信息',
  })
  local: object;
}
