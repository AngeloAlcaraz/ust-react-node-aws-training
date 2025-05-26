export class CreateProjectDto {
  name: string;
  description: string;
  imageUrl: string;
  contractTypeId: number;
  contractSignedOn: string;
  budget: number;
  isActive: boolean;
}
