import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { DbWrapper } from 'src/database/database.module';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPasswordService } from './user-password.service';

@Injectable()
export class UsersService {
  constructor(
    private db: DbWrapper,
    private userPasswordService: UserPasswordService,
  ) {}

  async findAll(page = 1, limit = 10, query = '') {
    const filter = {};
    if (query) {
      filter['$or'] = [
        { username: { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } },
        { phone: { $regex: query } },
        { email: { $regex: query, $options: 'i' } },
      ];
    }

    const offset = ((page > 0 ? page : 1) - 1) * limit;

    const users = this.db.User.find(filter)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(offset)
      .toArray();

    return users;
  }

  async findAndCountAll(page = 1, limit = 10, query = '') {
    const filter = {};

    if (query) {
      filter['$or'] = [
        { username: { $regex: query, $options: 'i' } },
        { name: { $regex: query } },
        { phone: { $regex: query.replace(/-/g, ''), $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ];
    }

    const offset = ((page > 0 ? page : 1) - 1) * limit;

    const users = await this.db.User.find(filter)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(offset)
      .toArray();

    const count = await this.db.User.countDocuments(filter);

    return {
      count,
      rows: users,
    };
  }

  findUsernameCount(query) {
    return this.db.User.countDocuments({
      username: query,
    });
  }

  async findOne(username: string) {
    return this.db.User.findOne({ username });
  }

  async findOneById(id: string | ObjectId) {
    let _id;
    if (typeof id === 'string') {
      _id = new ObjectId(id);
    } else {
      _id = id;
    }

    return this.db.User.findOne({ _id });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { hash, salt } = this.userPasswordService.createPassword(
      createUserDto.password,
    );
    try {
      await this.db.User.insertOne({
        username: createUserDto.username,
        password: hash,
        salt,
        email: createUserDto.email,
        role: createUserDto.role,
        phone: createUserDto.phone || '',
        name: createUserDto.name || '',
        deletable: createUserDto.deletable === true ? true : false,
      });

      const newUser = await this.findOne(createUserDto.username);

      delete newUser.password;
      delete newUser.salt;

      return { ...newUser };
    } catch (err) {
      throw new HttpException(
        '이미 사용중인 아이디입니다.',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async update(id: string | ObjectId, updateUserDto: UpdateUserDto) {
    let _id;
    if (typeof id === 'string') {
      _id = new ObjectId(id);
    } else {
      _id = id;
    }

    const { password, ...rest } = updateUserDto;

    const updateProperty = {
      ...rest,
    };

    if (password) {
      const { hash, salt } = this.userPasswordService.createPassword(password);
      updateProperty['password'] = hash;
      updateProperty['salt'] = salt;
    }

    try {
      const result = await this.db.User.updateOne(
        { _id },
        { $set: updateProperty },
      );
      return result;
    } catch (err) {
      throw new HttpException('Update Fail' + err, HttpStatus.BAD_REQUEST);
    }
  }

  delete(id: string | ObjectId) {
    let _id;
    if (typeof id === 'string') {
      _id = new ObjectId(id);
    } else {
      _id = id;
    }

    return this.db.User.deleteOne({ _id });
  }
}
