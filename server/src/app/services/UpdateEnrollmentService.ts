import { addMonths, parseISO } from 'date-fns';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';

class UpdateEnrollmentService {
  async run({
    enrollment_id, student_id, plan_id, start_date,
  }): Promise<Enrollment> {
    const enrollment = await Enrollment.findByPk(enrollment_id);

    if (!enrollment) {
      throw new Error('Enrollment does not exists');
    }

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      throw new Error('Plan does not exists');
    }

    const student = await Student.findByPk(student_id);
    if (!student) {
      throw new Error('Student does not exists');
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);

    await enrollment.update({
      plan_id,
      student_id,
      start_date,
      end_date,
      price: plan.duration * plan.price,
    });

    return enrollment;
  }
}

export default new UpdateEnrollmentService();
