import { Request, Response } from 'express';

import Student from '../models/Student';
import Checkin from '../models/Checkin';

import CreateCheckinService from '../services/CreateCheckinService';

class CheckinController {
  async index(req: Request, res: Response): Promise<Response> {
    const { student_id } = req.params;

    const checkins = await Checkin.findAll({
      where: { student_id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.status(200).json(checkins);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { student_id } = req.params;

    const checkin = await CreateCheckinService.run({
      student_id,
    });

    return res.status(200).json(checkin);
  }
}

export default new CheckinController();
