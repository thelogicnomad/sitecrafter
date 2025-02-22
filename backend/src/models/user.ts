import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define User Interface
export interface IUser {
  googleId?: string;
  username: string;
  email: string;
  password?: string; // Optional for OAuth users
  avatar?: string;
  createdAt?: Date;
}

// Extend IUser to create a Mongoose Document
export interface IUserDocument extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
}

// Create Schema
const userSchema = new Schema<IUserDocument>({
  googleId: { type: String, unique: true, sparse: true }, // Only for Google users
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Not required for OAuth users
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Hash Password before saving (only if password is provided)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare Password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password || '');
};

// Export Model
const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', userSchema);
export default User;
