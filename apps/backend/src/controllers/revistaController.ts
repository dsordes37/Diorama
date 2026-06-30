import type { Request, Response } from "express";
import { RevistaService } from "../services/revistaService.js";
import { fileUtils } from "../utils/fileUtils.js";

const service = new RevistaService();

interface ArquivosRevista {
  imagemDestaque?: Express.Multer.File[];
  revistaPdf?: Express.Multer.File[];
}


export class RevistaController {

    async listar(req: Request, res: Response) {

        const revistas = await service.listar();

        return res.json({quantidade: revistas.length, revistas:revistas});

    }

    async criar(req: Request, res: Response) {


        const { edicaoId, titulo, conteudo_html} = req.body;
        const files = req.files as ArquivosRevista; 


        const revistaPdf = files.revistaPdf?.[0];
        const imagemDestaque = files.imagemDestaque?.[0];


        if (!revistaPdf || !imagemDestaque) {

            if(!revistaPdf) fileUtils.apagarArquivo(imagemDestaque?.path);

            if(!imagemDestaque) fileUtils.apagarArquivo(revistaPdf?.path);

            res.status(400).json({ message: "É necessário enviar a imagem de destaque e o pdf da revista." });
            return;
        }

        if (!titulo || !edicaoId || !conteudo_html) {

            fileUtils.apagarArquivo(imagemDestaque?.path);
            fileUtils.apagarArquivo(revistaPdf?.path);

            res.status(400).json({ message: "Parâmetros insuficientes." });
            return;
        }

        try {
            
            const baseUrl = `${req.protocol}://${req.get('host')}/static`;
            const imagemDestaqueUrl = baseUrl + '/imagemDestaqueRevistas/' + imagemDestaque?.filename;
            const revistaPdfUrl = baseUrl + '/pdfRevistas/'+revistaPdf?.filename;

            const dataRevista = {
                edicaoId: edicaoId,
                titulo: titulo,
                conteudo_html: conteudo_html,
                imagemDestaque: imagemDestaqueUrl,
                pdfUrl: revistaPdfUrl
            }

            const revista = await service.cadastrar(dataRevista)

            res.status(201).json({ mensagem: "Revista Cadastrada com sucesso!", revista: revista });

        } catch (error) {
            fileUtils.apagarArquivo(revistaPdf?.path);
            fileUtils.apagarArquivo(imagemDestaque?.path);
            res.status(400).json({error: error})
            
        }
    
    }

}