import { Global, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './module/articles/articles.module';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/blog', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
      connectionName: 'blog',
    }),
    // TypegooseModule.forRoot('mongodb://localhost/blog-backupA', {
    //   useNewUrlParser: true,
    //   useFindAndModify: false,
    //   useCreateIndex: true,
    //   useUnifiedTopology: true,
    //   connectionName: 'blog-backupA',
    // }),
    // TypegooseModule.forRoot('mongodb://localhost/blog-backupB', {
    //   useNewUrlParser: true,
    //   useFindAndModify: false,
    //   useCreateIndex: true,
    //   useUnifiedTopology: true,
    //   connectionName: 'blog-backupB',
    // }),
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret:'09yujhngbfddc321erfgg',
          signOptions: {
            // expiresIn: '120',
          },
        };
      },
    }),
    UserModule,
    AuthModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule],
})
export class AppModule {}
