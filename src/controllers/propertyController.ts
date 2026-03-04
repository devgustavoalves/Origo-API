import { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProperty = async (req: Request, res: Response) => {
    const {nome, endereco, gestorId, proprietarioId} = req.body;

    try {
        const property = await prisma.propriedade.create({
            data: {
                nome,
                endereco,
                gestorId,
                proprietarioId
            },
        });
        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar propriedade' });
    }};

export const getProperties = async (req: Request, res: Response) => {
    try {
        const properties = await prisma.propriedade.findMany({
            include: {
                gestor: {
                    select: {
                        nome: true,
                    },
                },
                proprietario: {
                    select: {
                        nome: true,
                    },
                },
            },
        });
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar propriedades' });
    }};