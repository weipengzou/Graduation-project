import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {}
  async user(account) {
    return this.userModel.findOne({ account });
  }
}
