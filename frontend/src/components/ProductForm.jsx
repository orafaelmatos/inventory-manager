import { useState, useEffect } from "react";
import api from "../api/axios";

export default function ProductForm({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    stock_quantity: 0,
    min_stock: 10,
    price: 0,
    category: "",
    supplier: "",
  });

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    api.get("categories/").then((res) => setCategories(res.data));
    api.get("suppliers/").then((res) => setSuppliers(res.data));
  }, []);

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: ["stock_quantity", "min_stock", "price"].includes(name) ? Number(value) : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div
      className="
    fixed inset-0
    flex justify-center items-center
    bg-black/50
    backdrop-blur-sm
    z-50 p-4
  "
      aria-modal="true"
      role="dialog"
      aria-label={product ? "Editar Produto" : "Adicionar Produto"}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8
                   space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-extrabold text-gray-900">{product ? "Editar Produto" : "Adicionar Produto"}</h2>


        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nome do produto"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-5 py-3
                       placeholder-gray-400 focus:outline-none focus:ring-4
                       focus:ring-blue-300 transition"
          />
        </div>

        <div>
          <label htmlFor="sku" className="block text-sm font-semibold text-gray-700 mb-2">
            Código
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            placeholder="Código do produto"
            value={form.sku}
            disabled={product}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-5 py-3
                       placeholder-gray-400 focus:outline-none focus:ring-4
                       focus:ring-blue-300 transition"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
            Categoria
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-5 py-3 bg-white
                       focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          >
            <option value="" disabled>
              Selecione a categoria
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="supplier" className="block text-sm font-semibold text-gray-700 mb-2">
            Fornecedor
          </label>
          <select
            id="supplier"
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-5 py-3 bg-white
                       focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          >
            <option value="" disabled>
              Selecione o fornecedor
            </option>
            {suppliers.map((sup) => (
              <option key={sup.id} value={sup.id}>
                {sup.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="stock_quantity" className="block text-sm font-semibold text-gray-700 mb-2">
            Quantidade em Estoque
          </label>
          <input
            type="number"
            id="stock_quantity"
            name="stock_quantity"
            placeholder="0"
            min={0}
            value={form.stock_quantity}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-5 py-3
                       placeholder-gray-400 focus:outline-none focus:ring-4
                       focus:ring-blue-300 transition"
          />
        </div>

        <div>
          <label htmlFor="min_stock" className="block text-sm font-semibold text-gray-700 mb-2">
            Estoque Mínimo
          </label>
          <input
            type="number"
            id="min_stock"
            name="min_stock"
            placeholder="10"
            min={0}
            value={form.min_stock}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-5 py-3
                       placeholder-gray-400 focus:outline-none focus:ring-4
                       focus:ring-blue-300 transition"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
            Preço
          </label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            placeholder="0,00"
            min={0}
            value={form.price}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-5 py-3
                       placeholder-gray-400 focus:outline-none focus:ring-4
                       focus:ring-blue-300 transition"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-5 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700
                       hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold
                       hover:bg-blue-700 transition"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
