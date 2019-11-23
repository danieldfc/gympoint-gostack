import { Request, Response, NextFunction } from 'express';
import { object, string, number } from 'yup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = object().shape({
      title: string().strict(true),
      duration: number().positive(),
      price: number().positive(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({
        error: {
          message: 'Validation failure.',
        },
      });
  }
};
