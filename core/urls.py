from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.product_view import ProductViewSet
from .views.category_view import CategoryViewSet
from .views.supplier_view import SupplierViewSet
from .views.dashboard_view import DashboardStatsView
from .views.register import register

router = DefaultRouter()
router.register('products', ProductViewSet, basename='product')
router.register('categories', CategoryViewSet, basename='category')
router.register('suppliers', SupplierViewSet, basename='supplier')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('register/', register, name='register'),
]
