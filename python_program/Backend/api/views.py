from django.shortcuts import render
from rest_framework import generics
from .models import Category, Place, Review
from .serializers import CategorySerializer, placeSerializer, ReviewSerializer

# Create your views here.

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class  = CategorySerializer


class CategoryRetrivalUpdateDeleteView(generics.RetrieveDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class  = CategorySerializer



class PlaceCreateView(generics.ListCreateAPIView):
    queryset = Place.objects.all()
    serializer_class  = placeSerializer



class PlaceRetrivalUpdateDeleteView(generics.RetrieveDestroyAPIView):
    queryset = Place.objects.all()
    serializer_class  = placeSerializer


class ReviewListCreate(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class  = ReviewSerializer

class ReviewRetrivalUpdateDeleteView(generics.RetrieveDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class  = ReviewSerializer
