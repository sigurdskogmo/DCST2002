import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
})