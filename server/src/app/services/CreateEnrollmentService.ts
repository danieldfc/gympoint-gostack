import { addMonths, parseISO } from 'date-fns';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';

class CreateEnrollmentService {
  async run({ student_id, plan_id, start_date }): Promise<Enrollment> {
    const student = await Student.findByPk(student_id);

    if (!student) {
      throw new Error('Student does not exists');
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      throw new Error('Plan does not exists');
    }

    const studentCheckEnrollment = await Enrollment.findOne({
      where: {
        student_id,
      },
    });
    if (studentCheckEnrollment) {
      throw new Error('Student already enrolled in a plan');
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);

    const enrollment = await Enrollment.create({
      plan_id,
      student_id,
      start_date,
      end_date,
      price: plan.duration * plan.price,
    });

    return enrollment;
  }
}

export default new CreateEnrollmentService();
