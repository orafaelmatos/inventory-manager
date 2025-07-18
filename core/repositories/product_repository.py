from core.models import Product

class ProductRepository:
    @staticmethod
    def get_all():
        return Product.objects.all()

    @staticmethod
    def get_by_id(product_id):
        return Product.objects.get(id=product_id)

    @staticmethod
    def create(data):
        return Product.objects.create(**data)

    @staticmethod
    def update(product, data):
        for key, value in data.items():
            setattr(product, key, value)
        product.save()
        return product

    @staticmethod
    def delete(product):
        product.delete()
