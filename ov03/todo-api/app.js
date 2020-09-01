import express from 'express';
import lists from './data';
import routes from './routes';

const app = express();
app.use(express.json());

const router = express.Router();
app.use(routes);


const PORT = 3000;
app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
})