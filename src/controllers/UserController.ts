import { Prisma, PrismaClient } from "@prisma/client"
import { Request, Response } from "express";
import auth from "../config/auth";
import path  from 'path';

import {transporter, readRenderHTML} from "../config/mailer";
import handlebars from "handlebars";
import { validationResult } from "express-validator";

const prisma = new PrismaClient();

export default  {

    async create (req: Request, res: Response) {
        try {

            validationResult(req).throw();
            const { nome, cpf, email, senha } = req.body;
            const { hash, salt } = auth.generatePassword(senha);

            let usuarioInput : Prisma.UserCreateInput = {
                nome,
                cpf, 
                email,
                hash, 
                salt
            };

            const usuario = await prisma.user.create({
                data:usuarioInput
            });
            
            const pathTemplate = path.resolve(__dirname, "..", "..", "templates","messageTemplate.html");
            readRenderHTML (pathTemplate, (htmlTemplate:any) => {

                const template = handlebars.compile(htmlTemplate)

                //Contruindo objeto que preenche os campos do template
                const replacements = {
                    name:req.body.name,
                    message:"Bem vindo ao Patitas"
                }

                //Construindo o html da mensagem personalizada com as informações do usuario
                const htmlToSend = template(replacements);

                //Construindo a mensagem
                const message = {
                    from:process.env.MAIL_SENDER,
                    to: req.body.email,
                    subject:"Bem vindo",
                    html:htmlToSend,
                }

                //Enviando mensagem
                transporter.sendMail(message, (error) => {throw error})
            });

            return res.status(201).json(usuario)

        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    },

    async read (req: Request, res: Response) {
        try {
            const usuario = await prisma.user.findMany();
            return res.status(201).json(usuario)
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    },

    async index (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const usuario = await prisma.user.findUnique({
                where:{ id: Number(id) },
            })
            return res.status(201).json(usuario)
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    },

    async update (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { cpf, nome, email, endereco, cartao } = req.body;

            let usuarioInput : Prisma.UserUpdateInput = {
                cpf, 
                nome, 
                email, 
                endereco, 
                cartao
            };

            const usuario = await prisma.user.update({
                where: { id: Number(id) },
                data: usuarioInput,
            });
            
            return res.status(201).json(usuario)
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    },

    async destroy (req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            await prisma.productsOnCart.deleteMany({
                where: { userId: Number(id) }
            });

            await prisma.purchase.deleteMany({
                where: { userId: Number(id) }
            });

            await prisma.cart.deleteMany({
                where: { userId: Number(id) }
            });

            await prisma.pet.deleteMany({
                where: { id: Number(id) }
            });

            await prisma.user.delete({
                where: { id: Number(id) }
            });
    
            return res.status(200).json({ message: 'Usuario deleado com sucesso' });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
    
}
