import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: unknown, user: any): any {
    if (err || !user) {
      return undefined;
    }
    return user;
  }
}
