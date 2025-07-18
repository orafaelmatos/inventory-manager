from django.db import models

class Supplier(models.Model):
    name = models.CharField(max_length=100)
    contact_email = models.EmailField()

    def __str__(self):
        return self.name