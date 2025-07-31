import mongoose, { HydratedDocument, Model } from 'mongoose';
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserFields } from '../types';
import { ToObjectOptions } from 'mongoose';
import jwt from 'jsonwebtoken';

interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

interface IUserVirtual {
  confirmPassword: string;
}

export const generateTokenJWT = (_id: mongoose.Types.ObjectId) => {
  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: '365d' });
};

export const JWT_SECRET = process.env.JWT_SECRET || 'default_fallback_secret';

type IUserModel = Model<IUserFields, {}, IUserMethods>;

const userSchema = new mongoose.Schema<IUserFields, IUserModel, IUserMethods, {}, IUserVirtual>(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      validate: {
        validator: async function (value: string): Promise<boolean> {
          if (!this.isModified('username')) return true;
          const user: HydratedDocument<IUserFields> | null = await User.findOne({
            username: value,
          });
          return !user;
        },
        message: 'This Username already taken',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    avatar: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  {
    virtuals: {
      confirmPassword: {
        get() {
          return this.__confirmPassword;
        },
        set(confirmPassword: string) {
          this.__confirmPassword = confirmPassword;
        },
      },
    },
  },
);

userSchema.methods.checkPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  this.token = generateTokenJWT(this._id);
};

userSchema.path('password').validate(async function (v: string) {
  if (!this.isModified('password')) return;
  if (v !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password do not match');
    this.invalidate('password', 'Password do not match');
  }
});

const genSaltFactory = 10;
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(genSaltFactory);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

userSchema.set('toJSON', {
  transform: (_doc: any, ret: any) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

const User = mongoose.model('User', userSchema);
export default User;
