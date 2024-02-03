import { Prisma, PrismaClient } from "@prisma/client";
import multer from "multer"
import path from 'path';

const prisma = new PrismaClient();

const storage = multer.diskStorage ({

	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "..", "..", "uploads"));
	},
    filename: async function (req, file, cb) {
        const { id } = req.params;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const fileName = 'userId-' + id + '-' + uniqueSuffix + extension;

        try {
            await prisma.user.update({ where: { id: Number(id) }, data: { foto: fileName } });
            cb(null, fileName);
        } catch (error) {
            throw(error); 
        }
    }

});


const photoUpload = multer({

    storage: storage,

    limits: { fileSize: 10 * 1024 * 1024, files: 4},

    fileFilter: function (req, file, cb) 
    {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedTypes.includes(file.mimetype))
            return cb(new Error("Apenas arquivos .jpg, .jpeg e .png são suportados"));
        cb (null, true);
    }

});

export default photoUpload;