export interface CreateHobbyRecordDto {
  userId: number;
  hobbyId: number;
  title: string;
  content: string;
  activityDate: Date;
  goalAchieved?: boolean;
}