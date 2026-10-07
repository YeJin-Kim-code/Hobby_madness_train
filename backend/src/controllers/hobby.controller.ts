import { Request, Response } from 'express';
import { HobbyService } from '../services/hobby.service';

const hobbyService = new HobbyService();

export const getHobbies = async (req: Request, res: Response) => {
  try {
    const hobbies = await hobbyService.getHobbies();

    return res.status(200).json({
      message: '취미 목록 조회 성공',
      data: hobbies,
    });
  } catch (error) {
    return res.status(500).json({
      message: '취미 목록 조회 실패',
    });
  }
};

export const pinHobby = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.body.userId);
    const hobbyId = Number(req.params.id);

    const result = await hobbyService.pinHobby(userId, hobbyId);

    return res.status(200).json({
      message: '관심 취미 등록 성공',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : '관심 취미 등록 실패',
    });
  }
};

export const unpinHobby = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.body.userId);
    const hobbyId = Number(req.params.id);

    const result = await hobbyService.unpinHobby(userId, hobbyId);

    return res.status(200).json({
      message: '관심 취미 해제 성공',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : '관심 취미 해제 실패',
    });
  }
};