from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from core.services.product_service import ProductService
from core.serializers.product_serializer import ProductSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class ProductViewSet(ViewSet):
    permission_classes = [AllowAny]

    def list(self, request):
        products = ProductService.list_all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            product = ProductService.create_product(serializer.validated_data)
            return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        product = ProductService.get_by_id(pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def update(self, request, pk=None):
        product = ProductService.get_by_id(pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            updated_product = ProductService.update_product(pk, serializer.validated_data)
            return Response(ProductSerializer(updated_product).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        ProductService.delete_product(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)
