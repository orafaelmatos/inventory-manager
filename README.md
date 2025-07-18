# 📦 Inventory Manager

A full-stack **Inventory Management System** built with **Django REST Framework** (API) and **React + Tailwind CSS** (UI).  
The application provides an intuitive interface for managing **products, categories, suppliers**, and user authentication.

## 🌐 Live Demo
Access the application here:  
👉**[https://inventory-manager-zeta-sooty.vercel.app/](https://inventory-manager-zeta-sooty.vercel.app)**
- **API Docs:** `/api/docs/`
  
## Features
- ✅ **User Authentication** (Sign Up, Login, Logout)
- ✅ **CRUD for Products, Categories, and Suppliers**
- ✅ **Dashboard with Real-Time Statistics**
- ✅ **Responsive UI with Tailwind CSS**
- ✅ **JWT Authentication with DRF**
- ✅ **API Documentation using drf-spectacular (Swagger)**


## 🛠️ Tech Stack

### **Backend**
- [Python](https://www.python.org/)
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [django-cors-headers](https://github.com/adamchainz/django-cors-headers)
- [drf-spectacular](https://drf-spectacular.readthedocs.io/) (OpenAPI Docs)

### **Frontend**
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## ⚙️ Installation & Setup

### **Backend Setup**
```bash
# Clone the repository
git clone https://github.com/orafaelmatos/inventory-manager.git
cd inventory-manager/inventory_system

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Run development server
python manage.py runserver
```
### **Frontend Setup**
```bash
cd ../frontend

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
```
Open in your browser: http://localhost:5173
