import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/interfaces/user.interface';
import { CreateUserDto } from '../dto/create_user.dto';
import { UpdateUserDto } from '../dto/update_user.dto';
import bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data = {
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    data.password = bcrypt.hashSync(createUserDto.password, 12);
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.userModel.findOne({email}).exec();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const data = {
      ...updateUserDto,
      updatedAt: new Date(),
    };

    if (data.password) {
      data.password = bcrypt.hashSync(updateUserDto.password, 12);
    }
    const user = this.userModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();

    return user;
  }

  async findOne(_id: string): Promise<User | null> {
    const user = this.userModel.findOne({_id}).exec();
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async delete(_id: string) {
    return await this.userModel.findOneAndDelete({_id}).exec();
  }
}
