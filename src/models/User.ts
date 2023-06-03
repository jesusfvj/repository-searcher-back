import mongoose, { Document, Schema } from 'mongoose';
import { UserData } from '../interfaces/userModel';

interface UserDocument extends Document {
  userData: UserData;
}

const UserSchema = new Schema<UserDocument>({
  userData: {
    type: Schema.Types.Mixed,
    required: true,
    unique: true,
  },
});

const User = mongoose.model<UserDocument>('User', UserSchema);
export default User;
