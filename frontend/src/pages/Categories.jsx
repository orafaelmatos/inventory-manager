import { useState } from "react";
import Swal from "sweetalert2";
import { useCategories, useAddCategory, useUpdateCategory, useDeleteCategory } from "../hooks/useCategories";
import CategoryForm from "../components/CategoryForm";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function CategoriesPage() {
  const { data: categories, isLoading, isError } = useCategories();
  const addCategory = useAddCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  if (isLoading) return <div className="p-6 text-center">Carregando categorias...</div>;
  if (isError) return <div className="p-6 text-center text-red-600">Erro ao carregar categorias.</div>;

  const handleAdd = () => {
    setSelectedCategory(null);
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory.mutate(id);
        Swal.fire("Excluído!", "A categoria foi excluída com sucesso.", "success");
      }
    });
  };

  const handleSave = (category) => {
    if (category.id) {
      updateCategory.mutate(
        { id: category.id, data: { name: category.name } },
        { onSuccess: () => setShowForm(false) }
      );
    } else {
      addCategory.mutate(category, { onSuccess: () => setShowForm(false) });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4 sm:mb-0">Categorias</h1>
        <button
          onClick={handleAdd}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white text-lg font-semibold shadow-lg hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          + Adicionar Categoria
        </button>
      </header>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {categories?.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center py-8 text-gray-500 italic">
                  Nenhuma categoria encontrada.
                </td>
              </tr>
            )}
            {categories?.map((category) => (
              <tr key={category.id} className="hover:bg-blue-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold transition cursor-pointer"
                  >
                    <PencilIcon className="w-5 h-5" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-800 font-semibold transition cursor-pointer"
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
      {showForm && <CategoryForm category={selectedCategory} onClose={() => setShowForm(false)} onSave={handleSave} />}
    </div>
  );
}
