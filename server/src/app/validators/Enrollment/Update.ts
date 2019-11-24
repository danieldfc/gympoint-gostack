import { Request, Response, NextFunction } from 'express';
import { object, date, number } from 'yup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = object().shape({
      student_id: number()
        .positive()
        .integer(),
      plan_id: number()
        .positive()
        .integer(),
      start_date: date(),
      end_date: date(),
      price: number().positive(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: { message: 'Validations failures.' } });
  }
};
