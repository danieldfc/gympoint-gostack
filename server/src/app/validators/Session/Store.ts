import { Request, Response, NextFunction } from 'express';
import { object, string } from 'yup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = object().shape({
      email: string().email().strict(true).required(),
      password: string().strict(true).required(),
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
