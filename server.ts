import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// GET - all tasks
app.get('/tasks', async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// POST - create a task
app.post('/tasks', async (req: Request, res: Response) => {
  const { title, color } = req.body;
  const task = await prisma.task.create({
    data: { title, color },
  });
  res.status(201).json(task);
});

// PUT - update a task
app.put('/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;
  const task = await prisma.task.update({
    where: { id: parseInt(id) },
    data: { title, color, completed },
  });
  res.json(task);
});

// DELETE - remove a task
app.delete('/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.task.delete({
    where: { id: parseInt(id) },
  });
  res.status(204).send();
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
