import { useEffect, useState } from "react";
import "./Produto.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Produto(props) {
  const [formData, setFormData] = useState({
    nome: "",
    valor: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (props.editMode && props.editProductId !== null) {
      setFormData({
        nome: props.formData.nome,
        valor: props.formData.valor,
      });
    } else {
      setFormData({
        nome: "",
        valor: "",
      });
    }
  }, [props.editMode, props.editProductId, props.formData]);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    if (props.editMode) {
      if (id) {
        try {
          await axios.put(
            `http://localhost:8080/api/v1/produtos/${id}`,
            formData
          );
          navigate("/");
        } catch (error) {
          console.error("Error updating product:", error);
        }
      } else {
        console.error("ID not found for update");
      }
    } else {
      try {
        await axios.post("http://localhost:8080/api/v1/produtos", formData);
        navigate("/"); 
      } catch (error) {
        console.error("Error creating product:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "valor") {
      const formattedValue = value.replace(",", ".");
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <main className="containe-add">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="valor"
            placeholder="Valor"
            value={formData.valor}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        {props.editMode ? (
          <div>
            <button type="submit" className="btn-aprov">
              Atualizar
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button type="submit" className="btn-aprov">
            Adicionar
          </button>
        )}
      </form>
    </main>
  );
}

export default Produto;
