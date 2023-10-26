from django.db import models


from django.contrib.auth.models import AbstractUser


# from django.contrib.gis.db import models as gis_models
# from django.contrib.gis.gdal.libgdal import lgdal


# Create your models here.
class Category(models.Model):
    
    
    name = models.CharField(max_length=200)


    def __str__(self):
        return self.name


class Place(models.Model):
    name = models.CharField(max_length=200, default=0)
    description = models.TextField(max_length=1000)
    # location = gis_models.PointField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


    

class Review(models.Model):
    # user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()
    comment = models.TextField()



class CustomUser(AbstractUser):
    # username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username
