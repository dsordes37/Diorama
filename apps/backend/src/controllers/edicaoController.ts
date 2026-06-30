import type { Request, Response } from "express";
import { EdicaoService } from "../services/edicaoService.js";
import { fileUtils } from "../utils/fileUtils.js";

const service = new EdicaoService();
// interface MagazineFiles {
//   capa?: Express.Multer.File[];
// }

export class EdicaoController {
    async listar(req: Request, res: Response) {
    
        const edicoes = await service.listar();

        return res.json({quantidade: edicoes.length, edicoes:edicoes});

    }

    async criar(req: Request, res: Response) {


        const { titulo, numeroTag } = req.body;
        const capaFile = req.file               




        if (!capaFile) {
            res.status(400).json({ message: "É necessário enviar a imagem de capa." });
            return;
        }

        if (!titulo || !numeroTag) {

            fileUtils.apagarArquivo(capaFile?.path);

            res.status(400).json({ message: "Parâmetros insuficientes." });
            return;
        }

        try {
            
            const baseUrl = `${req.protocol}://${req.get('host')}/static`;
            const capaUrl = baseUrl + '/capas/' + capaFile?.filename;

            const dataEdicao = {
                numeroTag: numeroTag,
                titulo: titulo,
                capaUrl: capaUrl
            }

            const edicao = await service.cadastrar(dataEdicao)

            res.status(201).json({ mensagem: "Edição Cadastrada com sucesso!", edicao: edicao });

        } catch (error) {
            fileUtils.apagarArquivo(capaFile?.path);
            res.status(400).json({error: error})
            
        }
    
    }

    async deletar(req: Request, res: Response){
        
    }
}