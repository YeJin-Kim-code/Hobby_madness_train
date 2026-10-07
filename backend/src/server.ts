import app from './app';
import { AppDataSource } from './config/data-source';
import { seedHobbies } from './seeds/hobby.seed';

AppDataSource.initialize()
  .then(async() => {
    console.log('DB Connected');

    await seedHobbies();
    app.listen(3000, () => {
      console.log('Server Running');
    });
  })
  .catch((error) => {
    console.error(error);
  });