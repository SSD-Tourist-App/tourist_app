from rest_framework import serializers

from .models import Category, Place, Review


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class placeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'




class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'