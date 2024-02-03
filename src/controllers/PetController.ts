import { Prisma, PrismaClient } from "@prisma/client"
import { Request, Response } from "express";


const prisma = new PrismaClient();

export default  {

    async create (req: Request, res: Response) {
        try {
            const { usuarioID, nome, sexo, especie, vacina } = req.body;

            let petInput : Prisma.PetCreateInput = {
                usuario: { connect: { id: parseInt(usuarioID) } },
                nome,
                sexo,
                especie,
                vacina
            };

            const pet = await prisma.pet.create({
                data:petInput,
            });
            
            console.log(petInput);
            return res.status(201).json(pet)

        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    },

    async read (req: Request, res: Response) {
        try {
            const pet = await prisma.pet.findMany();
            return res.status(201).json(pet)
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    },

    async index (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const pet = await prisma.pet.findUnique({
                where:{ id: Number(id) },
            })
            return res.status(201).json(pet)
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    },

    async update (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, sexo, especie, vacina } = req.body;

            let petInput : Prisma.PetUpdateInput = {
                nome,
                sexo,
                especie,
                vacina
            };

            const pet = await prisma.pet.update({
                where: { id: Number(id) },
                data: petInput,
            });
            
            return res.status(201).json(pet)
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    },

    async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params;
    
            await prisma.pet.delete({
                where: { id: Number(id) }
            });
    
            return res.status(200).json({ message: 'Pet deletado com sucesso' });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
    
}