import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUsers() {
    return await this.userRepository.find();
  }
  async createUsers(createUserDetails: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...createUserDetails,
      createdAt: new Date(),
    });
    return await this.userRepository.save(newUser);
  }

  async updateUser(id: number, createUserDetails: CreateUserDto) {
    const ubdatedUser = this.userRepository.findOne({ where: { id } });
    if (!ubdatedUser) {
      throw new UnauthorizedException(`there is no such user with this id `);
    }

    return await this.userRepository.save({
      ...ubdatedUser,
      ...createUserDetails,
    });
  }
  async deleteUser(id: number) {
    const deletedUser = this.userRepository.findOne({ where: { id } });
    if (!deletedUser) {
      throw new UnauthorizedException(`there is no such user with this id `);
    }

    return await this.userRepository.delete({ id });
  }
}
