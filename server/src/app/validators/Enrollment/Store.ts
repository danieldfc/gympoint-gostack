import { Request, Response, NextFunction } from 'express';
import { object, date, number } from 'yup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = object().shape({
      student_id: number()
        .positive()
        .integer()
        .required(),
      plan_id: number()
        .positive()
        .integer()
        .required(),
      start_date: date().required(),
      end_date: date().required(),
      price: number().positive().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(401).json({
      error: { message: 'Validations failures.' },
    });
  }
};
