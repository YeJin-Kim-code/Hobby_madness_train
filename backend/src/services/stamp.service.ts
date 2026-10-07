import { AppDataSource } from "../config/data-source";
import { Stamp, StampType } from "../entities/stamp.entity";
import { User } from "../entities/user.entity";
import { Hobby } from "../entities/hobby.entity";
import { HobbyRecord } from "../entities/hobby-record.entity";

const stampRepository = AppDataSource.getRepository(Stamp);

export const createStamp = async (
  user: User,
  hobby: Hobby,
  record: HobbyRecord,
  goalAchieved: boolean
) => {
  const stamp = stampRepository.create({
    user,
    hobby,
    record,
    stampType: goalAchieved
      ? StampType.GOAL_ACHIEVED
      : StampType.RECORD_CREATED,
  });

  return await stampRepository.save(stamp);
};

export const getMyStamps = async (userId: number) => {
  return await stampRepository.find({
    where: {
      user: { id: userId },
    },
    relations: {
      hobby: true,
      record: true,
    },
    order: {
      createdAt: "DESC",
    },
  });
};

export const getMyStampSummary = async (userId: number) => {
  const stamps = await stampRepository.find({
    where: {
      user: { id: userId },
    },
    relations: {
      hobby: true,
    },
  });

  const summary = stamps.reduce((acc, stamp) => {
    const hobbyName = stamp.hobby.name;

    if (!acc[hobbyName]) {
      acc[hobbyName] = 0;
    }

    acc[hobbyName] += 1;

    return acc;
  }, {} as Record<string, number>);

  return summary;
};