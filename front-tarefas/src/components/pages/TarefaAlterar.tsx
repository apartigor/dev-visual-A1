import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tarefa } from "../../models/Tarefa";
import { Categoria } from "../../models/Categoria";

function TarefaAlterar() {
  const { tarefaId } = useParams();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  useEffect(() => {
    if (tarefaId) {
      axios
        .get<Tarefa>(
          `http://localhost:5000/api/tarefas/buscar/${tarefaId}`
        )
        .then((resposta) => {
          setTitulo(resposta.data.titulo);
          setDescricao(resposta.data.descricao);
          buscarCategorias();
        });
    }
  }, []);

  function buscarCategorias() {
    axios
      .get<Categoria[]>("http://localhost:5000/api/categoria/listar")
      .then((resposta) => {
        setCategorias(resposta.data);
      });
  }

  function enviarTarefa(e: any) {
    e.preventDefault();

    const tarefa: Tarefa = {
      titulo: titulo,
      descricao: descricao,
      categoriaId: categoriaId,
    };

    axios
      .put(`http://localhost:5000/api/tarefas/alterar/${tarefaId}`, tarefa)
      .then((resposta) => {
        console.log(resposta.data);
      });
  }

  return (
    <div>
      <h1>Alterar Tarefa</h1>
      <form onSubmit={enviarTarefa}>
        <div>
          <label htmlFor="Titulo">Titulo</label>
          <input
            type="text"
            id="Titulo"
            name="Titulo"
            value={titulo}
            required
            onChange={(e: any) => setTitulo(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            name="descricao"
            onChange={(e: any) => setDescricao(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="categoria">Categorias</label>
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

export default TarefaAlterar;