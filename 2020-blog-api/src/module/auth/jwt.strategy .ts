import { PassportStrategy } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { User } from 'src/models/user.model';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '09yujhngbfddc321erfgg',
    } as StrategyOptions);
  }
  async validate(id: string) {
    return await this.userModel.findById(id);
  }
}
