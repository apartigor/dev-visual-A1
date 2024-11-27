import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import TarefaLista from "./components/pages/TarefaLista";
import TarefaCadastro from "./components/pages/TarefaCadastro";
import TarefaAlterar from "./components/pages/TarefaAlterar";

function App() {
  return (
    <BrowserRouter>
      <div id="app">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pages/tarefa/listar">Listar Tarefas</Link>
            </li>
            <li>
              <Link to="/pages/tarefa/cadastrar">Cadastrar Tarefas</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<TarefaLista />} />
          <Route
            path="/pages/tarefa/listar" element={<TarefaLista />}
          />
          <Route
            path="/pages/tarefa/cadastrar" element={<TarefaCadastro />}
          />
          <Route
            path="/pages/tarefa/alterar/:id"
            element={<TarefaAlterar />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;