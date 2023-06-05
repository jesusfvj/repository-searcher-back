import mongoose, { Document, Schema } from 'mongoose';
import { UserData } from '../interfaces/userModel';

interface UserDocument extends Document {
  userData: UserData;
  token: string;
}

const UserSchema = new Schema<UserDocument>({
  userData: {
    type: Schema.Types.Mixed,
    required: true,
    unique: true,
  },
  token: {
    type: String,
  }
});

const User = mongoose.model<UserDocument>('User', UserSchema);
export default User;
