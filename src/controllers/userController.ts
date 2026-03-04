import { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Rota para registrar um novo usuário
export const registerUser = async (req: Request, res: Response) => {
  const { nome, email, senha_hash} = req.body;
  try {
    const salt = await bcrypt.genSalt(18);
    const hashedPassword = await bcrypt.hash(senha_hash, salt);

    const user = await prisma.usuario.create({
      data: {
        nome,
        email, 
        senha_hash: hashedPassword
      },
    });

    const { senha_hash: _, ...userWithoutPassword } = user;
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.usuario.findMany({
        select: {
            id: true,
            nome: true,
            email: true,
        }
    });

    res.status(200).json(users);
} catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
}};

