import { useEffect, useState } from "react";
import { Tarefa } from "../../models/Tarefa";
import axios from "axios";
import { Link } from "react-router-dom";

function TarefaLista() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/tarefas/listar")
            .then((resposta) => {
                return resposta.json();
            })
            .then((tarefas) => {
                setTarefas(tarefas);
            });
    });

    return (
        <div>
            <h1>Lista de tarefas</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Categoria</th>
                        <th>Descrição</th>
                        <th>Criado Em</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map((tarefa) => (
                        <tr key={tarefa.TarefaId}>
                            <td>{tarefa.TarefaId}</td>
                            <td>{tarefa.titulo}</td>
                            <td>{tarefa.categoria?.nome}</td>
                            <td>{tarefa.descricao}</td>
                            <td>{tarefa.criadoEm}</td>
                            <td>{tarefa.status}</td>
                            <td>
                                <Link to={`/pages/tarefa/alterar/${tarefa.TarefaId}`}>
                                    Alterar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TarefaLista;