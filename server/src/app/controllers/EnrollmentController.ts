import { Request, Response } from 'express';

import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

import CreateEnrollmentService from '../services/CreateEnrollmentService';
import UpdateEnrollmentService from '../services/UpdateEnrollmentService';

class EnrollmentController {
  async index(req: Request, res: Response): Promise<Response> {
    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { student_id } = req.params;
    const { plan_id, start_date } = req.body;

    const enrollment = await CreateEnrollmentService.run({
      student_id,
      plan_id,
      start_date,
    });

    return res.json(enrollment);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { plan_id, student_id, start_date } = req.body;

    const enrollment = await UpdateEnrollmentService.run({
      enrollment_id: id,
      plan_id,
      student_id,
      start_date,
    });

    return res.json(enrollment);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(400).json({
        error: { message: 'Enrollment does not exists' },
      });
    }

    await enrollment.destroy();

    return res.send();
  }
}

export default new EnrollmentController();
