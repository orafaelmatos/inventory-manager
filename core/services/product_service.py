from core.repositories.product_repository import ProductRepository

class ProductService:
    @staticmethod
    def list_all():
        return ProductRepository.get_all()

    @staticmethod
    def create_product(data):
        product = ProductRepository.create(data)
        if product.stock_quantity < product.min_stock:
            print(f"Alert: Low stock for {product.name}")
        return product
    
    @staticmethod
    def get_by_id(product_id):
        return ProductRepository.get_by_id(product_id)

    @staticmethod
    def update_product(product_id, data):
        product = ProductRepository.get_by_id(product_id)
        return ProductRepository.update(product, data)

    @staticmethod
    def delete_product(product_id):
        product = ProductRepository.get_by_id(product_id)
        ProductRepository.delete(product)
