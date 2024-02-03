import { Prisma, PrismaClient } from "@prisma/client"
import { Request, Response } from "express";


const prisma = new PrismaClient();

export default  {

    async create (req: Request, res: Response) {
        try {
            const {
                nome,
                preco, 
                descricao,
                categoria,
                quantidade,
            } = req.body;

            let produtoInput : Prisma.ProductCreateInput = {
                nome,
                preco, 
                descricao,
                categoria,
                quantidade,
            };

            const produto = await prisma.product.create({
                data:produtoInput,
            });
            
            console.log(produtoInput);
            return res.status(201).json(produto)

        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    },

    async read (req: Request, res: Response) {
        try {
            const produto = await prisma.product.findMany();
            return res.status(201).json(produto)
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    },

    async index (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const produto = await prisma.product.findUnique({
                where:{ id: Number(id) },
            })
            return res.status(201).json(produto)
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    },

    async update (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                nome,
                preco, 
                descricao,
                categoria,
                quantidade,
            } = req.body;

            let produtoInput : Prisma.ProductUpdateInput = {
                nome,
                preco, 
                descricao,
                categoria,
                quantidade,
            };

            const produto = await prisma.product.update({
                where: { id: Number(id) },
                data: produtoInput,
            });
            
            return res.status(201).json(produto)
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    },

    async destroy (req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            await prisma.productsOnCart.deleteMany({
                where: { productId: Number(id) }
            });

            await prisma.productsOnPurchase.deleteMany({
                where: { productId: Number(id) }
            });

            await prisma.product.delete({
                where: { id: Number(id) }
            });
    
            return res.status(200).json({ message: 'Produto deletado com sucesso' });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
    
}
