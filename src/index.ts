import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(cors());

// use with all origins
// app.use(cors({
//     origin: 'http://localhost:8000',
//     credentials: true
// }))

require('./Routes')(app);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

export default app;
