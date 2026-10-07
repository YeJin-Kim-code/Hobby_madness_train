import { AppDataSource } from '../config/data-source';
import { Hobby } from '../entities/hobby.entity';
import { User } from '../entities/user.entity';
import { UserHobby } from '../entities/user-hobby.entity';

export class HobbyService {
  private hobbyRepository = AppDataSource.getRepository(Hobby);
  private userRepository = AppDataSource.getRepository(User);
  private userHobbyRepository = AppDataSource.getRepository(UserHobby);

  async getHobbies() {
    return await this.hobbyRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async pinHobby(userId: number, hobbyId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const hobby = await this.hobbyRepository.findOne({
      where: { id: hobbyId },
    });

    if (!hobby) {
      throw new Error('취미를 찾을 수 없습니다.');
    }

    const existingUserHobby = await this.userHobbyRepository.findOne({
      where: {
        user: { id: userId },
        hobby: { id: hobbyId },
      },
      relations: {
    user: true,
    hobby: true,
  }
    });

    if (existingUserHobby) {
      existingUserHobby.isPinned = true;
      return await this.userHobbyRepository.save(existingUserHobby);
    }

    const userHobby = this.userHobbyRepository.create({
      user,
      hobby,
      isPinned: true,
    });

    return await this.userHobbyRepository.save(userHobby);
  }

  async unpinHobby(userId: number, hobbyId: number) {
    const userHobby = await this.userHobbyRepository.findOne({
      where: {
        user: { id: userId },
        hobby: { id: hobbyId },
      },
      relations: {
    user: true,
    hobby: true,
  },
    });

    if (!userHobby) {
      throw new Error('관심 취미로 등록되어 있지 않습니다.');
    }

    userHobby.isPinned = false;

    return await this.userHobbyRepository.save(userHobby);
  }
}