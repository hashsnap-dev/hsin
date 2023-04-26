import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('/')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('query') query: string,
  ) {
    const { count, rows } = await this.usersService.findAndCountAll(
      page,
      limit,
      query,
    );

    const users = rows.map((user) => {
      const { password, salt, ...rest } = user;
      return rest;
    });

    return {
      total: count,
      data: users,
    };
  }

  @Get('/check_username')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  async findCheckId(@Query('query') query: string) {
    const count = await this.usersService.findUsernameCount(query);

    return {
      total: count,
    };
  }

  @Put('/self')
  @UseGuards(AuthenticatedGuard)
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(req.user._id, updateUserDto);
    const user = await this.usersService.findOneById(req.user._id);

    const { password, salt, ...rest } = user;
    return rest;
  }

  @Get('/self')
  @UseGuards(AuthenticatedGuard)
  self(@Request() req) {
    return req.user;
  }

  @Put('/login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return req.user;
  }

  @Put('/logout')
  logout(@Request() req) {
    req.logOut();
    req.session.cookie.maxAge = 0;
  }

  @Get('/:id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  async findOne(@Param() params) {
    const user = await this.usersService.findOneById(params.id);
    const { password, salt, ...rest } = user;

    return rest;
  }

  @Put('/:id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  async update(@Param() params, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findOneById(params.id);

    await this.usersService.update(user._id, updateUserDto);
    const freshUser = await this.usersService.findOneById(user._id);

    const { password, salt, ...rest } = freshUser;
    return rest;
  }

  @Delete('/:id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  async delete(@Param() params) {
    const user = await this.usersService.findOneById(params.id);

    if (user.role === 'admin') {
      throw new HttpException('Not deletable', HttpStatus.BAD_REQUEST);
    }

    return this.usersService.delete(user._id);
  }
}
