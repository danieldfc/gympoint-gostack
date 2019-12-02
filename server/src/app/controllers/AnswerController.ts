import { Request, Response } from 'express';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class AnswerController {
  async store(req: Request, res: Response): Promise<Response> {
    const { help_order_id } = req.params;
    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(help_order_id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!helpOrder) {
      return res.status(400).json({
        error: { message: 'Help Order does not exists!' },
      });
    }

    if (helpOrder.answer !== null) {
      return res.status(400).json({
        error: { message: 'Help Order already answered!' },
      });
    }

    await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    return res.status(200).json(helpOrder);
  }
}

export default new AnswerController();
