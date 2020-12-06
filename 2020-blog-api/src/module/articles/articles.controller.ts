import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  Put,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger'
import { createArticleDto, GetArticleDto } from '../../dto'
import { ArticlesService } from './articles.service'

@ApiTags('文章')
@Controller('article')
export class ArticlesController {
  constructor(private readonly articlesServer: ArticlesService) {}
  // 获取文章区块 已完成
  @Get('')
  @ApiOperation({ summary: '获取文章' })
  async fetch(@Query() query: GetArticleDto) {
    return await this.articlesServer.getArticle(
      query.id,
      query.page,
      query.number,
    )
  }
  // 创建 已完成
  @Post()
  @ApiOperation({ summary: '创建文章' })
  async create(@Body() createArticleDto: createArticleDto) {
    let res = await this.articlesServer.createArticle(createArticleDto)
    return res
  }
  // 删除可以有，但没必要
  // @Delete(':hash')
  // @ApiOperation({ summary: '删除文章' })
  // async remove(@Param('hash') hash: string) {}
}
