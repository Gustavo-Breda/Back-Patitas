import { Prisma, PrismaClient } from "@prisma/client"
import { Request, Response } from "express";


const prisma = new PrismaClient();

export default  {
    
    async addProduct (req: Request, res: Response) {

        try {
            const { userId, productId, amount } = req.body;

            let produtoCartInput : Prisma.ProductsOnCartCreateInput = {
                user: { connect: { userId: parseInt(userId) } },
                product: { connect: { id: parseInt(productId) } },
                amount
            };


            const usuario = await prisma.user.findUnique({
                where: { id: userId }
            });
            if (!usuario) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }


            const produto = await prisma.product.findUnique({
                where: { id: productId }
            });
            if (!produto) {
                return res.status(404).json({ error: "Produto não encontrado" });
            }
            

            // Atualizando a quantidade de produtos na tabela Cart
            const cart = await prisma.cart.findUnique({
                where: { userId: userId }
            }); if (!cart) {
                return res.status(404).json({ error: "Carrinho não encontrado" });
            }
            const newProductsAmount = (cart.productsAmount || 0) + amount;
            const preco = produto.preco?.toNumber() ?? 0;
            const newTotalValue = preco * newProductsAmount;
            await prisma.cart.update({
                where: { userId: userId },
                data: { totalValue: newTotalValue, productsAmount: newProductsAmount }
            });


            // Atualizando a quantidade do produto na tabela ProductsOnCart
            const isPresente = await prisma.productsOnCart.findFirst({
                where: { userId: userId, productId: productId }
            });

            if (isPresente) {
                await prisma.productsOnCart.update({
                    where: { userId_productId: { userId: userId, productId: productId } },
                    data: { amount: isPresente.amount + amount }
                });
            } else {
                const addedProduct = await prisma.productsOnCart.create({
                    data: produtoCartInput,
                });

                console.log(produtoCartInput);
                return res.status(201).json(addedProduct);
            }
            return res.status(201).json({ message: "Item adicionado ao carrinho" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }

    },

    async removeProduct (req: Request, res: Response) {

        try {
            const { userId, productId } = req.body;

            // Verificando quantos Produtos existem
            const item = await prisma.productsOnCart.findFirst({
                where: { userId: userId, productId: productId }
            });
            if (!item) {
                return res.status(404).json({ error: "Produto não existe nesse carrinho" });
            }
            
            // Atualizando as props da tabela Cart
            const produto = await prisma.product.findUnique({where: { id: productId }});
            const cart = await prisma.cart.findUnique({where: { userId: userId }}); 

            const newTotalValue = (cart?.totalValue.toNumber() || 0) - (produto?.preco.toNumber() || 0);
            const newProductsAmount = (cart?.productsAmount || 0) - 1;

            await prisma.cart.update({
                where: { userId: userId },
                data: { totalValue: newTotalValue, productsAmount: newProductsAmount }
            });


            // Atualizando a quantidade do produto na tabela ProductsOnCart
            let quantidade_carrinho = 0;
            if (item?.amount) {
                quantidade_carrinho = item.amount;
            }
            if (quantidade_carrinho > 1) {

                await prisma.productsOnCart.update({
                    where: { userId_productId: { userId: userId, productId: productId } },
                    data: { amount: quantidade_carrinho - 1 }
                });

            } else {
                await prisma.productsOnCart.delete({
                    where: { userId_productId: { userId: userId, productId: productId } }
                });
            }
            return res.status(201).json({ message: "Item removido do carrinho" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }

    },
    
    async destroy (req: Request, res: Response) {
        try {
            const { userId } = req.params;
    
            await prisma.productsOnCart.deleteMany({
                where: { userId: Number(userId) }
            });

            // Atualizando as props da tabela Cart
            const cart = await prisma.cart.findUnique({where: { userId: Number(userId) }}); 
            
            await prisma.cart.update({
                where: { userId: Number(userId) },
                data: { totalValue: 0, productsAmount: 0 }
            });
    
            return res.status(200).json({ message: 'Carrinho esvaziado' });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

}