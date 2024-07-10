import {
  CanActivate,
  ExecutionContext,
  Global,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { JwtConfig } from 'src/config/jwt.config';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';

@Global()
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService<JwtConfig>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('Unauthorized');
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('secret'),
      });

      const user = payload as JwtUser;
      const userExist = await this.userRepo.findOne({
        where: [{ id: user.id }, { email: user.email }],
        relations: ['business'],
      });
      // Todo: cache user not found error
      if (!userExist) throw new UnauthorizedException('Unauthorized');
      delete userExist.password;
      request['user'] = userExist;
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

export type JwtUser = Pick<User, 'id' | 'email'>;
