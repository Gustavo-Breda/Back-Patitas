import { Prisma, PrismaClient } from "@prisma/client"
import { Request, Response } from "express";


const prisma = new PrismaClient();

export default  {

    async userOk (req:Request, res:Response) {

        const { id } = req.params;
        try {
            const user = await prisma.user.findUnique({
                where: {id: Number(id)}
            })

            if(!req.params || !user)
                return res.status(404).json({ message: "Usuário não encontrado." });

            res.status(200).json(user)
        } catch(error) {
            res.status(500).json({error:error})
        }

    }
}