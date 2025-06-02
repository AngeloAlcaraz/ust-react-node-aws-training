// projects.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsService } from '../service/projects.service';
import { ProjectsController } from '../controller/projects.controller';
import { Project, ProjectSchema } from '../schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Project.name, schema: ProjectSchema }],
      'projectsConnection',
    ),
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
