import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DbContextService } from 'src/db-context/db-context.service';
import { DepartmentDto } from './dto/department.dto';

@Injectable()
export class DepartmentService {
  constructor(private dbContext: DbContextService) {}

  createDepartment(dto: DepartmentDto, user: User) {
    return this.dbContext.department.create({
      data: {
        name: dto.name,
        location: dto.location,
      },
    });
  }

  updateDepartment(id: string, dto: DepartmentDto, user: User) {
    return this.dbContext.department.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
        location: dto.location,
      },
    });
  }

  deleteDepartment(id: string, user: User) {
    return this.dbContext.department.delete({
      where: {
        id: id,
      },
    });
  }

  getDepartments() {
    return this.dbContext.department.findMany();
  }

  getDepartment(id: string) {
    return this.dbContext.department.findUnique({
      where: {
        id: id,
      },
    });
  }
}
