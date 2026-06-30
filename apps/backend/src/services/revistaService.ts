import { db } from "@diorama/db";

export class RevistaService {

    async listar() {
        return await db.revista.findMany();
    }

    async buscar(id: string) {
        return await db.revista.findUnique({
            where: { id }
        });
    }

    async cadastrar(data:{
        edicaoId: string;
        titulo: string;
        conteudo_html: string;
        imagemDestaque: string;
        pdfUrl: string;
    }){
        return await db.revista.create({data})
    }

}
