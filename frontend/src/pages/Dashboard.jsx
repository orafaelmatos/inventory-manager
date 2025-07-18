import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await api.get("dashboard/stats/");
      return res.data;
    },
  });

  if (isLoading) return <div className="p-6">Carregando Dashboard...</div>;
  if (isError) return <div className="p-6 text-red-600">Erro ao carregar dados</div>;

  const { total_products, inventory_value, categories, recent_activity, trends } = data;

  // ✅ Transform trends for Recharts
  const trendData = trends || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total de Produtos</h2>
          <p className="text-4xl font-bold text-blue-600">{total_products}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold text-gray-600">Valor do Inventário</h2>
          <p className="text-4xl font-bold text-green-600">
            R$ {inventory_value.toFixed(2).replace(".", ",")}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Atividades Recentes</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {recent_activity.length > 0 ? (
              recent_activity.map((item, i) => <li key={i}>• {item}</li>)
            ) : (
              <li>Nenhuma atividade recente</li>
            )}
          </ul>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Categorias de Produtos</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categories}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Tendências de Inventário</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trendData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="produtos" name="Produtos Adicionados" fill="#3b82f6" />
              <Bar dataKey="valor" name="Valor Total (R$)" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
