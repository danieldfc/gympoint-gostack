import { Op } from 'sequelize';
import { subDays } from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CreateCheckinService {
  async run({ student_id }): Promise<Checkin> {
    const student = await Student.findByPk(student_id);

    if (!student) {
      throw new Error('Student does not exists');
    }

    const countCheckins = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: { [Op.between]: [subDays(new Date(), 7), new Date()] },
      },
    });

    if (countCheckins.count >= 5) {
      throw new Error('You can only check-in 5 times every 7 days!');
    }

    const checkin = await Checkin.create({
      student_id,
    });

    return checkin;
  }
}

export default new CreateCheckinService();
