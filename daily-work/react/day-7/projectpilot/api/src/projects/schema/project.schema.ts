import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'projects' })
export class Project extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop()
  contractTypeId: number;

  @Prop()
  contractSignedOn: string;

  @Prop()
  budget: number;

  @Prop()
  isActive: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
