export class Project {
  _id?: string;
  name: string = '';
  description: string = '';
  imageUrl: string = '';
  contractTypeId: number | undefined;
  contractSignedOn: Date = new Date();
  budget: number = 0;
  isActive: boolean = false;
  get isNew(): boolean {
    return this._id === undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(initializer?: any) {
    if (!initializer) return;
    this._id = initializer._id;
    this.name = initializer.name ?? '';
    this.description = initializer.description ?? '';
    this.imageUrl = initializer.imageUrl ?? '';
    this.contractTypeId = initializer.contractTypeId;
    this.contractSignedOn = initializer.contractSignedOn ? new Date(initializer.contractSignedOn) : new Date();
    this.budget = initializer.budget ?? 0;
    this.isActive = initializer.isActive ?? false;
  }
}