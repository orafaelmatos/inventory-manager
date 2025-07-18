import { useState } from "react";
import { useProducts, useAddProduct, useUpdateProduct, useDeleteProduct } from "../hooks/useProducts";
import ProductForm from "../components/ProductForm";
import Swal from "sweetalert2";

// Heroicons React components (you can install via: npm install @heroicons/react)
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function Products() {
  const { data: products, isLoading, isError } = useProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  if (isLoading) return <div className="p-10 text-center text-gray-500">Carregando produtos...</div>;
  if (isError) return <div className="p-10 text-center text-red-600">Erro ao carregar produtos.</div>;

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6", // blue-500
      cancelButtonColor: "#EF4444",  // red-500
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct.mutate(id);
        Swal.fire("Excluído!", "O produto foi excluído com sucesso.", "success");
      }
    });
  };

  const handleSave = (product) => {
    if (product.id) {
      updateProduct.mutate(product, {
        onSuccess: () => setShowForm(false),
      });
    } else {
      addProduct.mutate(product, {
        onSuccess: () => setShowForm(false),
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4 sm:mb-0">
          Produtos
        </h1>
        <button
          onClick={handleAdd}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white text-lg font-semibold shadow-lg hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Adicionar Produto"
        >
          + Adicionar Produto
        </button>
      </header>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Nome",
                "Código (SKU)",
                "Quantidade em Estoque",
                "Estoque Mínimo",
                "Preço (R$)",
                "Ações",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {products?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400 italic">
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
            {products?.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{product.sku}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {product.stock_quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{product.min_stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  R$ {Number(product.price).toFixed(2).replace(".", ",")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold transition cursor-pointer"
                    aria-label={`Editar produto ${product.name}`}
                  >
                    <PencilIcon className="w-5 h-5" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-800 font-semibold transition cursor-pointer"
                    aria-label={`Excluir produto ${product.name}`}
                  >
                    <TrashIcon className="w-5 h-5" />
                    <span>Excluir</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ProductForm
          product={selectedProduct}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
