import { Request, Response, NextFunction } from 'express';
import { object, string, number } from 'yup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = object().shape({
      name: string().strict(true),
      email: string()
        .strict(true)
        .email(),
      age: number().positive(),
      weight: number().positive(),
      height: number().positive(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: { message: 'Validation failure.' } });
  }
};
