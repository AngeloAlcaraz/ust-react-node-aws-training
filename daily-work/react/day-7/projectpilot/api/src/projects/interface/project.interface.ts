import { Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  imageUrl: string;
  contractTypeId: number;
  contractSignedOn: string;
  budget: number;
  isActive: boolean;
}
