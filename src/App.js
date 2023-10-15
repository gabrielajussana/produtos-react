import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Produto from "./components/Produto/Produto";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar-produto" element={<Produto />} />
          <Route path="/editar-produto/:id" element={<Produto editMode={true} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
