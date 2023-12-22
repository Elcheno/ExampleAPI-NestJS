import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { NoteController } from './note/note.controller';
import { NoteService } from './note/note.service';
import { NoteModule } from './note/note.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { TokenBearer } from './middleware/tokenBearer';


@Module({
  imports: [UserModule, NoteModule, AuthModule],
  controllers: [AppController, NoteController, AuthController],
  providers: [AppService, PrismaService, NoteService, AuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenBearer)
      .forRoutes('note');
  }
}
