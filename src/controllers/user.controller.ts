import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Query,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create_user.dto';
import { UpdateUserDto } from '../dto/update_user.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../guards/auth.guard';
import { PermissionGuard } from '../guards/permission.guard';
import { Permission } from '../guards/permission.decorator';

@ApiTags('users')
@ApiBearerAuth('access_token')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Permission('view-user')
  @ApiQuery({ name: 'page' })
  @UseGuards(AuthGuard, PermissionGuard)
  async index(@Query() page: number = 1, @Res() response) {
    const users = await this.userService.findAll(page);

    return response.status(200).send({
      success: true,
      users,
      page,
    });
  }

  @Get(':id')
  @Permission('view-user')
  @UseGuards(AuthGuard, PermissionGuard)
  async detail(@Param('id') id: string, @Res() response) {
    const user = await this.userService.findOne(id);

    return response.status(200).send({
      success: true,
      user,
    });
  }

  @Post()
  @Permission('create-user')
  @UseGuards(AuthGuard, PermissionGuard)
  async store(@Body() body: CreateUserDto, @Res() response) {
    const result = await this.userService.create(body);

    return response.status(201).send({
      success: true,
      message: 'Created new user.',
      result,
    });
  }

  @Put(':id')
  @Permission('update-user')
  @UseGuards(AuthGuard, PermissionGuard)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Res() response,
  ) {
    const result = await this.userService.update(id, body);

    return response.status(200).send({
      success: true,
      message: `Update user ID #${id}`,
      result,
    });
  }

  @Delete(':id')
  @Permission('delete-user')
  @UseGuards(AuthGuard, PermissionGuard)
  async delete(@Param('id') id: string, @Res() response) {
    const result = await this.userService.delete(id);

    return response.status(200).send({
      success: true,
      message: `Delete user ID #${id}`,
    });
  }
}
