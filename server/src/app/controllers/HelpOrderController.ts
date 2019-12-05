import { Request, Response } from 'express';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import Mail from '../../lib/Mail';

class HelpOrderController {
  async index(req: Request, res: Response): Promise<Response> {
    const { student_id } = req.params;
    const helpOrder = await HelpOrder.findAll({
      where: {
        student_id,
        answer: null,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.status(200).json(helpOrder);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { student_id } = req.params;
    const { question } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res
        .status(400)
        .json({ error: { message: 'Student does not exists' } });
    }


    const helpOrder = await HelpOrder.create({
      student_id,
      question,
    });

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Create help',
      template: 'HelpOrderMail',
      context: {
        name: student.name,
      },
    });

    return res.status(200).json(helpOrder);
  }
}

export default new HelpOrderController();
