import { useState, useEffect } from "react";

export default function SupplierForm({ supplier, onClose, onSave }) {
  const [form, setForm] = useState({ name: "", email: ""});

  useEffect(() => {
    if (supplier) setForm(supplier);
    else setForm({ name: "", email: "" });
  }, [supplier]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ id: supplier?.id, ...form });
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
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8
                   space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-extrabold text-gray-900">
          {supplier ? "Editar Fornecedor" : "Adicionar Fornecedor"}
        </h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nome do fornecedor"
          required
          className="w-full rounded-lg border border-gray-300 px-5 py-3
                       placeholder-gray-400 focus:outline-none focus:ring-4
                       focus:ring-blue-300 transition"
        />
        <input
          type="email"
          name="contact_email"
          value={form.contact_email}
          onChange={handleChange}
          placeholder="E-mail"
          className="w-full rounded-lg border border-gray-300 px-5 py-3
                       placeholder-gray-400 focus:outline-none focus:ring-4
                       focus:ring-blue-300 transition"
        />

        <div className="flex justify-center space-x-4 pt-5 border-gray-200">
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
