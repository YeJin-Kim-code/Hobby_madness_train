import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/user.entity';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async signup(signupDto: SignupDto) {
    const { email, password, nickname } = signupDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new Error('이미 사용 중인 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      nickname,
    });

    await this.userRepository.save(user);

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      createdAt: user.createdAt,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error('JWT_SECRET이 설정되지 않았습니다.');
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn: '1h',
      }
    );

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      },
    };
  }
}