import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService = new AuthService();

  signup = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.signup(req.body);

      return res.status(201).json({
        message: '회원가입 성공',
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : '회원가입 실패',
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.login(req.body);

      return res.status(200).json({
        message: '로그인 성공',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : '로그인 실패',
      });
    }
  };
}