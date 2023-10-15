import axios from "axios";
import React from "react";
import "./Home.css";

import { Link } from "react-router-dom";

const Home = () => {
  const [produtos, setProdutos] = React.useState();

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/produtos"
        );
        setProdutos(response.data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Tem certeza de que deseja apagar este produto?"
    );
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/v1/produtos/${productId}`);
      const updatedProducts = produtos.filter(
        (produto) => produto.id !== productId
      );
      setProdutos(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const parseValue = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <main className="list-container">
      <h1>Lista de Produtos</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{parseValue(produto.valor)}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteProduct(produto.id)}
                >
                  Apagar
                </button>
              </td>
              <td>
                <td>
                  <Link
                    to={`/editar-produto/${produto.id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Atualizar
                  </Link>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Home;
