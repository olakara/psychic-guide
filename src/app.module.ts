import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [AuthModule, DepartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
