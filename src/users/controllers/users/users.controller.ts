import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfileDto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findUsers();
  }

  @Post()
  createUser(@Body() createuserData: CreateUserDto) {
    return this.usersService.createUsers(createuserData);
  }

  @Put(':id')
  ubdateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() createuserData: CreateUserDto,
  ) {
    return this.usersService.updateUser(id, createuserData);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createuserData: CreateUserProfileDto,
  ) {
    // return createuserData;
    return this.usersService.createUserProfile(id, createuserData);
  }
}
