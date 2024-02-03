import { Prisma, PrismaClient } from "@prisma/client"
import { Request, Response } from "express";


const prisma = new PrismaClient();

export default  {

    async create (req: Request, res: Response) {
        try {
            const { userId, totalValue, productsAmount, products } = req.body;

            let cartInput : Prisma.CartCreateInput = {
                user: { connect: { id: parseInt(userId) } },
                totalValue, 
                productsAmount, 
                products
            };

            const carrinho = await prisma.cart.create({ data:cartInput });
            
            console.log(cartInput);
            return res.status(201).json(carrinho)

        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    },
    
    async read (req: Request, res: Response) {
        try {
            const pet = await prisma.cart.findMany();
            return res.status(201).json(pet)
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    },

    async index (req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const pet = await prisma.cart.findUnique({
                where:{ userId: Number(userId) },
            })
            return res.status(201).json(pet)
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    },

}