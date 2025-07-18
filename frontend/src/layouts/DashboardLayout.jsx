import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CubeIcon,
  TagIcon,
  TruckIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
    { name: "Produtos", path: "/products", icon: CubeIcon },
    { name: "Categorias", path: "/categories", icon: TagIcon },
    { name: "Fornecedores", path: "/suppliers", icon: TruckIcon },
  ];

  const handleLogout = () => {
    // ✅ Remove auth info (adapt based on your app)
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    // ✅ Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col shadow-lg">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white leading-tight">
            Inventário <br />
            <span className="text-blue-400 text-lg">Controle de Estoque</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* ✅ Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left px-4 py-4 rounded hover:bg-red-600 transition"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 text-red-400" />
            <span className="font-medium text-red-400">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
