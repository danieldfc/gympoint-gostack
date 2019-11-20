import { Request, Response } from 'express';

import Student from '../models/Student';

class StudentController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const checkStudent = await Student.findOne({ where: { email } });

    if (checkStudent) {
      return res
        .status(400)
        .json({ error: { message: 'Student already exists.' } });
    }

    const {
      id, name, age, weight, height,
    } = await Student.create(req.body);

    return res.status(200).json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const { id } = req.params;

    if (email) {
      const checkStudent = await Student.findOne({ where: { email } });

      if (checkStudent) {
        return res.status(401).json({
          error: { message: 'Student already exists with this email.' },
        });
      }
    }

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: { message: 'Student not found.' } });
    }

    const { name, weight, height } = await student.update(req.body);

    return res.status(200).json({
      id,
      name,
      email,
      weight,
      height,
    });
  }
}

export default new StudentController();
