import { Request, Response } from 'express';

import User from '../models/user.model';

class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const checkUser = await User.findOne({ where: { email } });

    if (checkUser) {
      return res.status(400).json({
        error: {
          message: 'User already exists.',
        },
      });
    }

    const { id, name } = await User.create(req.body);

    return res.status(200).json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
