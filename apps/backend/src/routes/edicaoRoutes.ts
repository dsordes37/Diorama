import { Router } from "express";
import { EdicaoController } from "../controllers/edicaoController.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";

const edicaoRoutes:Router = Router();
const controller = new EdicaoController();

edicaoRoutes.get("/", controller.listar);
edicaoRoutes.post("/", uploadMiddleware.single("capa"), controller.criar);

export default edicaoRoutes;