import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import {
  BlogSchema,
  BlogSchemaBackupA,
  BlogSchemaBackupB,
} from '../../models/article.model';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [
    TypegooseModule.forFeature(
      [BlogSchema, BlogSchemaBackupA, BlogSchemaBackupB],
      'blog',
    ),
    // TypegooseModule.forFeature([BlogSchemaBackupA], 'blog'),
    // TypegooseModule.forFeature([BlogSchemaBackupB], 'blog'),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
