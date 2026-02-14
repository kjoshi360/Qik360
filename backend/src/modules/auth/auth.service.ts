import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const tenant = await this.prisma.tenant.create({
      data: {
        name: dto.tenantName,
        users: {
          create: { email: dto.email, passwordHash, role: dto.role },
        },
      },
      include: { users: true },
    });
    const user = tenant.users[0];
    return this.sign(user.id, tenant.id, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.sign(user.id, user.tenantId, user.role);
  }

  private sign(userId: string, tenantId: string, role: string) {
    return {
      accessToken: this.jwtService.sign({ sub: userId, tenantId, role }),
      user: { id: userId, tenantId, role },
    };
  }
}
