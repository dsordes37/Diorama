import {db} from "@diorama/db";

export class EdicaoService {

    async listar() {
        return await db.edicao.findMany();
    }

    async buscar(id: string) {
        return await db.edicao.findUnique({
            where: { id }
        });
    }

    async cadastrar(data:{
        numeroTag: string,
        titulo: string,
        capaUrl: string
    }){
        return await db.edicao.create({data})
    }
}