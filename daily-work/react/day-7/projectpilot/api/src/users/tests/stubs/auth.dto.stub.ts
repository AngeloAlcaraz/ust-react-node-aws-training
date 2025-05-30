import { AuthDto } from '../../dtos/auth.dto';

export const AuthDtoStub = (): AuthDto => {
  return {
    email: 'manoj.sethi@manojsethi.com',
    password: 'testingpassword',
  };
};
