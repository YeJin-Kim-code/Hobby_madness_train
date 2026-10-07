import { Request, Response } from "express";
import * as stampService from "../services/stamp.service";

export const getMyStamps = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const stamps = await stampService.getMyStamps(userId);

    return res.status(200).json({
      message: "스탬프 목록 조회 성공",
      data: stamps,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "스탬프 목록 조회 실패",
    });
  }
};

export const getMyStampSummary = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const summary = await stampService.getMyStampSummary(userId);

    return res.status(200).json({
      message: "스탬프 요약 조회 성공",
      data: summary,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "스탬프 요약 조회 실패",
    });
  }
};