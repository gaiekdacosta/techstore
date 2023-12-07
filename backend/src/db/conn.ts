import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
    try {
        const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

        const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_NAME}.mongodb.net/?retryWrites=true&w=majority`;

        await mongoose.connect(uri);

        console.log('Conectado ao banco de dados!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
};

export default connectToDatabase;
