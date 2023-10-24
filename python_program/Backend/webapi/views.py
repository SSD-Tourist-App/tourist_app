from django.shortcuts import render
from rest_framework import generics
from .models import Category, Place, Review
from .serializers import CategorySerializer, placeSerializer, ReviewSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer, UserLoginSerializer

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




class SignUp(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SignIn(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
            if user:
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





