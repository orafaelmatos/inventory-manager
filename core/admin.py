from django.contrib import admin
from core.models.supplier import Supplier
from core.models.category import Category
from core.models.product import Product

admin.site.register(Supplier)
admin.site.register(Category)
admin.site.register(Product)