import mongoose, { Document, Schema, Model } from 'mongoose';

interface User {
    name: string;
    birthday: Date;
    gender: string;
    email: string;
    password: string;
}

interface UserDocument extends Document, User {}

interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const UserModel = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { UserModel, User, UserDocument };
