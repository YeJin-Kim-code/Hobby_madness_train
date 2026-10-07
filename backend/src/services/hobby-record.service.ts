import { AppDataSource } from '../config/data-source';
import { HobbyRecord } from '../entities/hobby-record.entity';
import { User } from '../entities/user.entity';
import { Hobby } from '../entities/hobby.entity';
import { Stamp, StampType } from '../entities/stamp.entity';
import { CreateHobbyRecordDto } from '../dto/create-hobby-record.dto';
import { UpdateHobbyRecordDto } from '../dto/update-hobby-record.dto';

export class HobbyRecordService {
  private hobbyRecordRepository = AppDataSource.getRepository(HobbyRecord);
  private userRepository = AppDataSource.getRepository(User);
  private hobbyRepository = AppDataSource.getRepository(Hobby);
  private stampRepository = AppDataSource.getRepository(Stamp);

  async createHobbyRecord(createHobbyRecordDto: CreateHobbyRecordDto) {
    const { userId, hobbyId, title, content, activityDate, goalAchieved } =
      createHobbyRecordDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('존재하지 않는 사용자입니다.');
    }

    const hobby = await this.hobbyRepository.findOne({
      where: { id: hobbyId },
    });

    if (!hobby) {
      throw new Error('존재하지 않는 취미입니다.');
    }

    const hobbyRecord = this.hobbyRecordRepository.create({
      user,
      hobby,
      title,
      content,
      activityDate,
      goalAchieved: goalAchieved ?? false,
    });

    const savedRecord = await this.hobbyRecordRepository.save(hobbyRecord);

    const stamp = this.stampRepository.create({
      user,
      hobby,
      record: savedRecord,
      stampType: savedRecord.goalAchieved
        ? StampType.GOAL_ACHIEVED
        : StampType.RECORD_CREATED,
    });

    await this.stampRepository.save(stamp);

    return {
      id: savedRecord.id,
      title: savedRecord.title,
      content: savedRecord.content,
      activityDate: savedRecord.activityDate,
      goalAchieved: savedRecord.goalAchieved,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      },
      hobby: {
        id: hobby.id,
        name: hobby.name,
      },
      createdAt: savedRecord.createdAt,
      updatedAt: savedRecord.updatedAt,
    };
  }

  async getHobbyRecords(userId: number) {
    const records = await this.hobbyRecordRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
        hobby: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return records.map((record) => ({
      id: record.id,
      title: record.title,
      content: record.content,
      activityDate: record.activityDate,
      goalAchieved: record.goalAchieved,
      hobby: {
        id: record.hobby.id,
        name: record.hobby.name,
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    }));
  }

  async getHobbyRecordsByHobby(userId: number, hobbyId: number) {
    const records = await this.hobbyRecordRepository.find({
      where: {
        user: { id: userId },
        hobby: { id: hobbyId },
      },
      relations: {
        user: true,
        hobby: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return records.map((record) => ({
      id: record.id,
      title: record.title,
      content: record.content,
      activityDate: record.activityDate,
      goalAchieved: record.goalAchieved,
      hobby: {
        id: record.hobby.id,
        name: record.hobby.name,
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    }));
  }

  async getHobbyRecordById(userId: number, recordId: number) {
    const record = await this.hobbyRecordRepository.findOne({
      where: {
        id: recordId,
        user: { id: userId },
      },
      relations: {
        user: true,
        hobby: true,
      },
    });

    if (!record) {
      throw new Error('기록을 찾을 수 없습니다.');
    }

    return {
      id: record.id,
      title: record.title,
      content: record.content,
      activityDate: record.activityDate,
      goalAchieved: record.goalAchieved,
      hobby: {
        id: record.hobby.id,
        name: record.hobby.name,
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  }

  async updateHobbyRecord(
    userId: number,
    recordId: number,
    updateHobbyRecordDto: UpdateHobbyRecordDto
  ) {
    const record = await this.hobbyRecordRepository.findOne({
      where: {
        id: recordId,
      },
      relations: {
        user: true,
        hobby: true,
      },
    });

    if (!record) {
      throw new Error('기록을 찾을 수 없습니다.');
    }

    if (record.user.id !== userId) {
      throw new Error('수정 권한이 없습니다.');
    }

    record.title = updateHobbyRecordDto.title ?? record.title;
    record.content = updateHobbyRecordDto.content ?? record.content;
    record.activityDate =
      updateHobbyRecordDto.activityDate ?? record.activityDate;
    record.goalAchieved =
      updateHobbyRecordDto.goalAchieved ?? record.goalAchieved;

    await this.hobbyRecordRepository.save(record);

    return {
      id: record.id,
      title: record.title,
      content: record.content,
      activityDate: record.activityDate,
      goalAchieved: record.goalAchieved,
      hobby: {
        id: record.hobby.id,
        name: record.hobby.name,
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  }

  async deleteHobbyRecord(userId: number, recordId: number) {
    const record = await this.hobbyRecordRepository.findOne({
      where: {
        id: recordId,
      },
      relations: {
        user: true,
      },
    });

    if (!record) {
      throw new Error('기록을 찾을 수 없습니다.');
    }

    if (record.user.id !== userId) {
      throw new Error('삭제 권한이 없습니다.');
    }

    await this.hobbyRecordRepository.remove(record);

    return {
      id: record.id,
    };
  }
}