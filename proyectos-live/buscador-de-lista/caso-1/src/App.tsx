import type { Product } from "./types";
import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>(
    localStorage.getItem("searchQuery") || ""
  );
  const [order, setOrder] = useState<string>(
    localStorage.getItem("orderPreference") || "Por defecto"
  );

  useEffect(() => {
    api.search(query).then(setProducts);
  }, [query]);

  useEffect(() => {
    if (order === "Alfabeticamente") {
      setProducts((prevProducts) =>
        [...prevProducts].sort((a, b) => a.title.localeCompare(b.title))
      );
    } else if (order === "Precio") {
      setProducts((prevProducts) =>
        [...prevProducts].sort((a, b) => a.price - b.price)
      );
    } else {
      setProducts((prevProducts) =>
        [...prevProducts].sort((a, b) => a.id - b.id)
      );
    }
  }, [order]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    localStorage.setItem("searchQuery", value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setOrder(value);
    localStorage.setItem("orderPreference", value);
  };

  return (
    <main>
      <select onChange={handleOrderChange} value={order} name="Ordenar" id="">
        <option value="Por defecto">Por defecto</option>
        <option value="Alfabeticamente">Alfabeticamente</option>
        <option value="Precio">Precio</option>
      </select>

      <h1>Tienda digitaloncy</h1>
      <input
        name="text"
        placeholder="tv"
        type="text"
        value={query}
        onChange={handleQueryChange}
      />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>
              ${" "}
              {product.price.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
