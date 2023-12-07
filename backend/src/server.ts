import express from 'express';
import cors from 'cors';
import helmet from 'cors';
import dotenv from 'dotenv';
import conn from './db/conn';

dotenv.config();
import routes from './routes/routes'

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet())
app.use(routes)

// DB CONNECTION
conn()

app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`➜ Server running in port: ${port}`);
});