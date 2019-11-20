import { Request, Response, NextFunction } from 'express';
import { object, string, number } from 'yup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = object().shape({
      name: string()
        .strict(true)
        .required(),
      email: string()
        .strict(true)
        .email()
        .required(),
      age: number()
        .positive()
        .required(),
      weight: number()
        .positive()
        .required(),
      height: number()
        .positive()
        .required(),
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
