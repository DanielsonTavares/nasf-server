import { Response } from 'express';

class ErrorHandler extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);

    this.name = code.toString();
    this.code = code;
    this.message = message;
  }
}

export const handleError = async (err: ErrorHandler, res: Response) => {
  const { name, message } = err;

  res.status(err.code).json({
    status: 'error',
    name,
    message,
    stack: err.stack,
  });
};

export default ErrorHandler;
