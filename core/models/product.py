from django.db import models
from core.models.category import Category
from core.models.supplier import Supplier

class Product(models.Model):
    name = models.CharField(max_length=100)
    sku = models.CharField(max_length=6)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    stock_quantity = models.IntegerField()
    min_stock = models.IntegerField(default=10)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    
    def __str__(self):
        return f"{self.name} ({self.sku})"
