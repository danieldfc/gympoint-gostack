import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import { Request, Response } from 'express';

import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async store(req: Request, res: Response): Promise<Response> {
    const { student_id } = req.params;
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res
        .status(400)
        .json({ error: { message: 'Student does not exists' } });
    }

    const countCheckins = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: { [Op.between]: [subDays(new Date(), 7), new Date()] },
      },
    });

    if (countCheckins.count >= 5) {
      return res.status(400).json({
        error: {
          message: 'You can only check-in 5 times every 7 days!',
        },
      });
    }

    const checkin = await Checkin.create({
      student_id,
    });

    return res.status(200).json(checkin);
  }
}

export default new CheckinController();
