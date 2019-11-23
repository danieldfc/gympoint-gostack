import { Request, Response } from 'express';

import Plan from '../models/Plan';

class PlanController {
  async index(req: Request, res: Response): Promise<Response> {
    const plans = await Plan.findAll();

    return res.status(200).json(plans);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: { message: 'Plan not found' } });
    }

    return res.status(200).json({
      id,
      title: plan.title,
      duration: plan.duration,
      price: plan.price,
    });
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { title } = req.body;

    const planExists = await Plan.findOne({ where: { title } });

    if (planExists) {
      return res.status(400).json({
        error: {
          message: 'Title invalid',
        },
      });
    }

    const { id, duration, price } = await Plan.create(req.body);

    return res.status(200).json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title } = req.body;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: { message: 'Plan not found' } });
    }

    if (title !== plan.title) {
      const checkPlan = await Plan.findOne({
        where: { title },
      });

      if (checkPlan) {
        return res
          .status(400)
          .json({ error: { message: 'Plan already exists.' } });
      }
    }

    await plan.update(req.body);

    return res.status(200).json({
      id,
      title: plan.title,
      duration: plan.duration,
      price: plan.price,
    });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: { message: 'Plan  not found.' } });
    }

    await plan.destroy();

    return res.status(200).json();
  }
}

export default new PlanController();
