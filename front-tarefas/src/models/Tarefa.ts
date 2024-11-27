import { Categoria } from "./Categoria";

export interface Tarefa {
    TarefaId?: string;
    titulo: string;
    descricao: string;
    status?: string;
    criadoEm?: string;
    categoriaId: number;
    categoria?: Categoria;
}