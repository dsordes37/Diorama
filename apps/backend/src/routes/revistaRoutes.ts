import { Router } from "express";
import { RevistaController } from "../controllers/revistaController.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";

const revistaRoutes:Router = Router();
const controller = new RevistaController();

revistaRoutes.get("/", controller.listar);
revistaRoutes.post("/", uploadMiddleware.fields([
    {name:"revistaPdf", maxCount:1},
    {name:"imagemDestaque", maxCount:1}
]),controller.criar);

export default revistaRoutes;