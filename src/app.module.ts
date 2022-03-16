import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { DbContextModule } from './db-context/db-context.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    DepartmentModule,
    DbContextModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
