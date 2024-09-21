
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { AuthService } from 'src/app/authModule/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }

  canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if(!authorization)  throw new BadRequestException("Token inválido");
    const { sub : userId} = this.authService.checkToken(authorization);
    request.user = {
      id : String(userId)
    }
    return true
  }
}