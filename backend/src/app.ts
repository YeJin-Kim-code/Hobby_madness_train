import express from 'express';
import authRouter from './routes/auth.routes';
import hobbyRoutes from "./routes/hobby.routes"
import hobbyRecordRoutes from './routes/hobby-record.routes';
import stampRoutes from "./routes/stamp.routes";
const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/api/hobbies', hobbyRoutes);
app.use('/api/hobby-records', hobbyRecordRoutes);
app.use("/stamps", stampRoutes);
export default app;