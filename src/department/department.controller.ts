import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './dto/department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: DepartmentDto, @GetUser() user: User) {
    return this.departmentService.createDepartment(dto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: DepartmentDto,
    @GetUser() user: User,
  ) {
    return this.departmentService.updateDepartment(id, dto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string, @GetUser() user: User) {
    return this.departmentService.deleteDepartment(id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  byId(@Param('id') id: string, @GetUser() user: User) {
    return this.departmentService.getDepartment(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  all(@GetUser() user: User) {
    return this.departmentService.getDepartments();
  }
}
