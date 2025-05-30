// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/modules/projects.module';
// import { UsersModule } from './users/modules/users.module';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
    // UsersModule,
  ],
})
export class AppModule {}
