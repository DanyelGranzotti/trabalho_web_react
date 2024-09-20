import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form, ListGroup } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  const [gastos, setGastos] = useState([]);
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [valor, setValor] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  // Carrega os gastos do localStorage quando o componente é montado
  useEffect(() => {
    const storedGastos = JSON.parse(localStorage.getItem("gastos"));
    if (storedGastos) {
      setGastos(storedGastos);
    }
    setData(getCurrentDate());
  }, []);

  // Atualiza o localStorage sempre que os gastos mudam
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  // Função para obter a data atual no formato 'YYYY-MM-DD'
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Função para adicionar um novo gasto
  const adicionarGasto = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setError("Todos os campos são obrigatórios!");
      setValidated(true);
      return;
    }

    if (!nome || !data || !valor) {
      setError("Todos os campos são obrigatórios!");
      return;
    }

    const novoGasto = { nome, data, valor: parseFloat(valor) };
    setGastos([...gastos, novoGasto]);
    setNome("");
    setData(getCurrentDate());
    setValor("");
    setValidated(false);
    setError("");
  };

  // Função para remover um gasto
  const removerGasto = (index) => {
    const novosGastos = gastos.filter((_, i) => i !== index);
    setGastos(novosGastos);
  };

  // Calcula o valor total gasto
  const valorTotal = gastos.reduce((total, gasto) => total + gasto.valor, 0);

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Form noValidate validated={validated} onSubmit={adicionarGasto}>
          <Form.Group className="mb-3" controlId="formNomeGasto">
            <Form.Label>Nome do Gasto:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Ex: RU"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira o nome do gasto.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDataGasto">
            <Form.Label>Data do Gasto:</Form.Label>
            <Form.Control
              required
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira a data do gasto.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formValorGasto">
            <Form.Label>Valor do Gasto (R$):</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Ex: 3.00"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              min="0.01"
              step="0.01"
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira um valor válido para o gasto.
            </Form.Control.Feedback>
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <Button variant="primary" type="submit">
            Adicionar Gasto
          </Button>
        </Form>

        <h2 className="mt-5">Lista de Gastos</h2>
        <ListGroup>
          {gastos.map((gasto, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{gasto.nome}</strong> - {gasto.data} - R${" "}
                {gasto.valor.toFixed(2)}
              </div>
              <button
                onClick={() => removerGasto(index)}
                className="btn-delete"
              >
                <BsTrashFill size={20} />
              </button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <h3 className="mt-5">Total Gasto: R$ {valorTotal.toFixed(2)}</h3>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
