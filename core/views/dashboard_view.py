from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, Count
from django.db.models.functions import TruncMonth
from datetime import timedelta
from core.models.product import Product
from django.utils import timezone

class DashboardStatsView(APIView):

    def get(self, request):
        # Total products and inventory value
        total_products = Product.objects.count()
        inventory_value = Product.objects.aggregate(total=Sum('price'))['total'] or 0

        # Products by category
        category_data = (
            Product.objects.values('category__name')
            .annotate(count=Count('id'))
            .order_by()
        )
        categories = [{'name': c['category__name'], 'value': c['count']} for c in category_data]

        # Recent activity (last 5 products)
        recent_products = Product.objects.order_by('-created_at')[:5]
        recent_activity = [f"Adicionado: {p.name}" for p in recent_products]

        # Trends: Last 6 months
        six_months_ago = timezone.now() - timedelta(days=180)
        monthly_data = (
            Product.objects.filter(created_at__gte=six_months_ago)
            .annotate(month=TruncMonth('created_at'))
            .values('month')
            .annotate(count=Count('id'), value=Sum('price'))
            .order_by('month')
        )

        # Prepare chart data as array of dicts for Recharts
        trends = [
            {
                "month": m['month'].strftime('%b'),  # Jan, Feb, ...
                "produtos": m['count'],
                "valor": float(m['value'] or 0),
            }
            for m in monthly_data
        ]

        return Response({
            "total_products": total_products,
            "inventory_value": inventory_value,
            "categories": categories,
            "recent_activity": recent_activity,
            "trends": trends
        })
