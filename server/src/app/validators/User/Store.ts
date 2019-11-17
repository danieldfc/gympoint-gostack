import { Request, Response, NextFunction } from 'express';
import { object, string } from 'yup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = object().shape({
      name: string().strict(true).required(),
      email: string().email().strict(true).required(),
      password: string().min(6).strict(true).required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(401).json({
      error: {
        message: 'Validation failure.',
      },
    });
  }
};
