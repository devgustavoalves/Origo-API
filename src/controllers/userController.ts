  import { type Request, type Response } from "express";
  import { PrismaClient } from "@prisma/client";
  import bcrypt from "bcrypt";

  const prisma = new PrismaClient();

  // Rota para registrar um novo usuário
  export const registerUser = async (req: Request, res: Response) => {
    const { nome, email, senha_hash, pix_chave } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(senha_hash, salt);

      const result = await prisma.$transaction(async (tx) => {
        const user = await tx.usuario.create({
          data: {
            nome,
            email,
            senha_hash: hashedPassword,
          },
        });
        const proprietario = await tx.proprietario.create({
          data: {
            usuarioId: user.id,
            nome: user.nome,
            email: user.email,
            pix_chave: null,
          },
        });
        return { user, proprietario };
      });

      const { senha_hash: _, ...userWithoutPassword } = result.user;
      res.status(201).json({
        message: "Usuário e Perfil de Proprietário criados com sucesso!",
        usuario: userWithoutPassword,
        proprietario: result.proprietario,
      });
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
        },
      });

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  };
