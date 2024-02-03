import { Request, Response } from "express";
import Auth from "../config/auth";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class AuthController {

  async login (req: Request, res: Response) {

    try {
      const usuario = await prisma.user.findUnique({ where: { email: req.body.email } });
      if (!usuario)
        return res.status(404).json({ message: "Usuário não encontrado." });
      const { senha } = req.body;
      if (Auth.checkPassword(senha, usuario.hash, usuario.salt)) {
        const token = Auth.generateJWT(usuario);
        return res.status(200).json({ token: token });
      } else {
        return res.status(401).json({ message: "Senha inválida." });
      }
    } catch (e) {
      return res.status(500).json({ err: e });
    }
    
  }

  async getDetails (req: Request, res: Response) {

    try {
      const token = Auth.getToken(req);
      const payload = Auth.decodeJWT(token);
      const usuario = await prisma.user.findUnique({ where: { id: payload.sub } });
      if (!usuario)
        return res.status(404).json({ message: "Usuário não encontrado." });
      return res.status(200).json({ client: usuario });
    } catch (e) {
      return res.status(500).json({ err: e });
    }

  }

}

export default new AuthController();