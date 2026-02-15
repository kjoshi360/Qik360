import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('should be defined', () => {
    const service = new AuthService({} as any, new JwtService({ secret: 'x' }));
    expect(service).toBeDefined();
  });
});
