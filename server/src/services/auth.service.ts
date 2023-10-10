import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ userName: userData.userName });
    if (findUser) throw new HttpException(409, `This username already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    createUserData.password = undefined;
    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ tokenData: TokenData; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ userName: userData.userName });
    if (!findUser) throw new HttpException(404, `This user name ${userData.userName} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);
    findUser.password = undefined;
    return { findUser, tokenData };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ userName: userData.userName, password: userData.password });
    if (!findUser) throw new HttpException(404, `This user name ${userData.userName} was not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60 * 24 * 1000;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default AuthService;
