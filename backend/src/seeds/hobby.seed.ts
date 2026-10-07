import { AppDataSource } from "../config/data-source";
import { Hobby } from "../entities/hobby.entity";

const hobbySeedData = [
  {
    name: "등산",
    description: "산을 오르며 체력과 성취감을 쌓는 취미",
  },
  {
    name: "독서",
    description: "책을 읽고 생각을 기록하는 취미",
  },
  {
    name: "운동",
    description: "몸을 움직이며 건강을 관리하는 취미",
  },
  {
    name: "그림",
    description: "그림을 그리며 감정과 아이디어를 표현하는 취미",
  },
  {
    name: "요리",
    description: "음식을 만들며 즐거움과 성취감을 느끼는 취미",
  },
];

export const seedHobbies = async () => {
  const hobbyRepository = AppDataSource.getRepository(Hobby);

  for (const hobbyData of hobbySeedData) {
    const existingHobby = await hobbyRepository.findOne({
      where: { name: hobbyData.name },
    });

    if (!existingHobby) {
      const hobby = hobbyRepository.create(hobbyData);
      await hobbyRepository.save(hobby);
    }
  }

  console.log("Hobby seed completed");
};