import { Request, Response } from 'express';
import { addMonths, parseISO } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

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
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: { message: 'Student does not exists' } });
    }

    const { plan_id, start_date } = req.body;
    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: { message: 'Plan does not exists' } });
    }

    const studentCheckEnrollment = await Enrollment.findOne({
      where: {
        student_id,
      },
    });
    if (studentCheckEnrollment) {
      return res
        .status(400)
        .json({ error: { message: 'Student already enrolled in a plan' } });
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);

    const enrollment = await Enrollment.create({
      plan_id,
      student_id,
      start_date,
      end_date,
      price: plan.duration * plan.price,
    });

    return res.json(enrollment);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exists' });
    }

    const { plan_id, student_id, start_date } = req.body;
    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);

    await enrollment.update({
      plan_id,
      student_id,
      start_date,
      end_date,
      price: plan.duration * plan.price,
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
