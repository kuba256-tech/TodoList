export interface IUser {
  username: string;
  password: string;
  avatar: File | null;
  token: string;
}

export interface ILoginUser {
  username: string;
  password: string;
}

export interface IRegisterUser {
  username: string;
  password: string;
  confirmPassword: string;
  avatar: File | null;
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
}

export type ITaskMutation = Omit<ITask, '_id'>;

export interface IValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface IGlobalError {
  error: string;
}
