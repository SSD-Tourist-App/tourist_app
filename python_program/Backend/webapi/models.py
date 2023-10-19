from django.db import models



# Create your models here.

class Room(models.Model):
    code  = models.CharField(max_length=15, default="", unique=True)
    host = models.CharField(max_length=50, default="", unique=True)
    guest_can_Pause   = models.BooleanField(default=False)
    votes_to_skip =    models.IntegerField(default=False)
    created_at =       models.DateField(auto_now_add=True)