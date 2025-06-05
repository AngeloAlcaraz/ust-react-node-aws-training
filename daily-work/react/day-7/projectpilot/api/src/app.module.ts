// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/modules/projects.module';
import { UsersModule } from './users/modules/users.module';
import { AuthModule } from './auth/modules/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017',
      {
        connectionName: 'projectsConnection',
        dbName: process.env.PROJECTS_DB_NAME || 'projectsdb',
      },
    ),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017',
      {
        connectionName: 'usersConnection',
        dbName: process.env.USERS_DB_NAME || 'nest',
      },
    ),
    ProjectsModule,
    UsersModule,
    AuthModule,
    HealthModule,
  ],
})
export class AppModule {}
