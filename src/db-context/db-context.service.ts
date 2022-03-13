import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DbContextService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://puser:example@localhost:5432/nest?schema=public',
        },
      },
    });
  }
}
