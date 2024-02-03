import cors from 'cors';
import express from 'express';
import router  from './src/routes/routes';
import configDotenv from './src/config/dotenv';

configDotenv();

const app = express();
const port = process.env.PORT;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get('/', (req, res) => { res.send('Hello World!') });

app.listen(port, () => {console.log( `${process.env.APP_NAME} app listening at http://localhost:${port}` )});
    