/* eslint-disable */
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AccessTokenGuard } from '../../common/gaurds/gaurd.access_token';
import { User, UserSchema } from '../schemas/user.schema';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../tests/utils/mongo/mongo_in_memory';
import { UsersController } from './users.controller';
import { UsersService } from '../service/users.service';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();
    usersController = app.get<UsersController>(UsersController);
  });
  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
  it('should ensure the AccessTokenGuard is applied to the controller', async () => {
    const guards = Reflect.getMetadata('__guards__', UsersController);
    const guard = new guards[0]();
    expect(guard).toBeInstanceOf(AccessTokenGuard);
  });
  afterAll(async () => {
    await closeInMongodConnection();
  });
});
