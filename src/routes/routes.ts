import { Router } from "express";


import AuthController from "../controllers/AuthController";
import { validatorUser } from "../config/validation";
import photoUpload  from "../config/file";

import ProductController from "../controllers/ProductController";
import ProductsOnCart from "../controllers/ProductsOnCart";
import CartController from "../controllers/CartController";
import UserController from "../controllers/UserController";
import PetController from "../controllers/PetController";

import fileOk from "../middlewares/fileOk";


const router = Router();

router.post("/login", AuthController.login);
router.get("/userInfo", AuthController.getDetails);

router.post("/produtos", ProductController.create);
router.post("/carrinho", CartController.create);
router.post("/usuario", validatorUser("create")!, UserController.create);
router.post("/pet", PetController.create);

router.get("/produtos", ProductController.read);
router.get("/carrinho", CartController.read);
router.get("/usuario", UserController.read);
router.get("/pet", PetController.read);

router.get("/produtos/:id", ProductController.index);
router.get("/carrinho/:id", CartController.index)
router.get("/usuario/:id", UserController.index);
router.get("/pet/:id", PetController.index);

router.post("/produtos/:id", ProductController.update);
router.post("/usuario/:id", UserController.update);
router.post("/pet/:id", PetController.update);

router.delete("/remove_produto_carrinho/:userId", ProductsOnCart.destroy);
router.delete("/produtos/:id", ProductController.destroy);
router.delete("/usuario/:id", UserController.destroy);
router.delete("/pet/:id", PetController.destroy);

router.delete("/remove_produto_carrinho", ProductsOnCart.removeProduct);
router.post("/add_produto_carrinho", ProductsOnCart.addProduct);

router.post("/user/setFoto/:id", photoUpload.single("fotoPerfil"), fileOk.userOk);


export default router;