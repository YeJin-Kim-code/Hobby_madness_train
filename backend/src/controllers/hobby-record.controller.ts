import { Response } from 'express';
import { HobbyRecordService } from '../services/hobby-record.service';
import { AuthRequest } from '../middlewares/auth.middleware';

const hobbyRecordService = new HobbyRecordService();

export const createHobbyRecord = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;

    const hobbyRecord = await hobbyRecordService.createHobbyRecord({
      ...req.body,
      userId,
    });

    return res.status(201).json({
      message: '기록 작성 성공',
      data: hobbyRecord,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: '서버 오류가 발생했습니다.',
    });
  }
};

export const getHobbyRecords = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;

    const records = await hobbyRecordService.getHobbyRecords(userId);

    return res.status(200).json({
      message: '기록 목록 조회 성공',
      data: records,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: '서버 오류가 발생했습니다.',
    });
  }
};

export const getHobbyRecordsByHobby = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.userId;
    const hobbyId = Number(req.params.hobbyId);

    const records = await hobbyRecordService.getHobbyRecordsByHobby(
      userId,
      hobbyId
    );

    return res.status(200).json({
      message: '취미별 기록 조회 성공',
      data: records,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: '서버 오류가 발생했습니다.',
    });
  }
};

export const getHobbyRecordById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const recordId = Number(req.params.id);

    const record = await hobbyRecordService.getHobbyRecordById(
      userId,
      recordId
    );

    return res.status(200).json({
      message: '기록 상세 조회 성공',
      data: record,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: '서버 오류가 발생했습니다.',
    });
  }
};

export const updateHobbyRecord = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const recordId = Number(req.params.id);

    const hobbyRecord = await hobbyRecordService.updateHobbyRecord(
      userId,
      recordId,
      req.body
    );

    return res.status(200).json({
      message: '기록 수정 성공',
      data: hobbyRecord,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: '서버 오류가 발생했습니다.',
    });
  }
};

export const deleteHobbyRecord = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const recordId = Number(req.params.id);

    const deletedRecord = await hobbyRecordService.deleteHobbyRecord(
      userId,
      recordId
    );

    return res.status(200).json({
      message: '기록 삭제 성공',
      data: deletedRecord,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: '서버 오류가 발생했습니다.',
    });
  }
};