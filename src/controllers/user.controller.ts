import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create_user.dto';
import { UpdateUserDto } from '../dto/update_user.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags('users')
@ApiBearerAuth('access_token')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async index(@Res() response) {
    const users = await this.userService.findAll()

    return response.status(200).send({
      success: true,
      users,
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async detail(@Param('id') id: string, @Res() response) {
    const user = await this.userService.findOne(id)

    return response.status(200).send({
      success: true,
      user,
    });
  }

  @Post()
  @UseGuards(AuthGuard)
  async store(@Body() body: CreateUserDto, @Res() response) {
    const result = await this.userService.create(body)

    return response.status(201).send({
      success: true,
      message: 'Created new user.',
      result,
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() body: UpdateUserDto, @Res() response) {
    const result = await this.userService.update(id, body)

    return response.status(200).send({
      success: true,
      message: `Update user ID #${id}`,
      result,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string, @Res() response) {
    const result = await this.userService.delete(id)

    return response.status(200).send({
      success: true,
      message: `Delete user ID #${id}`,
    });
  }
}
