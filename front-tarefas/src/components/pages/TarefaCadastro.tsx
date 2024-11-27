import { useEffect, useState } from "react";
import { Tarefa } from "../../models/Tarefa";
import { Categoria } from "../../models/Categoria";
import axios from "axios";


function TarefaCadastro() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoriaId, setCategoriaId] = useState("");

    useEffect(() => {
        axios
            .get<Categoria[]>("http://localhost:5000/api/categoria/listar")
            .then((resposta) => {
                setCategorias(resposta.data );
            });
    }); 

    function enviarTarefa(e: any) {
        e.preventDefault();

        const tarefa: Tarefa = {
            titulo: titulo,
            descricao: descricao,
            categoriaId: categoriaId,
        };

        fetch("http://localhost:5000/api/tarefas/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tarefa),
        })
            .then((resposta) => {
                return resposta.json();
            })
            .then((tarefa) => {
                console.log("Tarefa cadastrada", tarefa);
            });
    }

    return (
        <div id="cadastro_tarefa">
            <h1>Cadastrar Tarefa</h1>
            <form onSubmit={enviarTarefa}>
                <div>
                    <label htmlFor="titulo">Titulo</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        required
                        onChange={(e: any) => setTitulo(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="descricao">Descrição</label>
                    <input
                        type="text"
                        id="descricao"
                        name="descricao"
                        onChange={(e: any) => setDescricao(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="categorias">Categorias</label>
                    <select
                        onChange={(e: any) => setCategoriaId(e.target.value)}
                    >
                        {categorias.map((categoria) => (
                            <option     
                                value={categoria.categoriaId}
                                key={categoria.categoriaId}
                            >
                                {categoria.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Cadastrar Tarefa</button>
            </form>
        </div>
    );
}

export default TarefaCadastro;