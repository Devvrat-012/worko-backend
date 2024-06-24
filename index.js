import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/routes/user.routes.js';
import './src/config/database.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
