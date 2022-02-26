import database from '../database/index.js';

export const createOrder = (req, res) => {
  const order = req.body;
  database.data.orders.push(order);
  res.status(200).json(order);

  database.write();
}
