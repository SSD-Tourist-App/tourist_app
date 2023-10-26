# from django.shortcuts import render

from .serializers import UserSerializer, UserLoginSerializer
# from django.shortcuts import render
# from rest_framework import generics


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer, UserLoginSerializer

# # Create your views here.


# class SignUp(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             token, created = Token.objects.get_or_create(user=user)
#             return Response({'token': token.key}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class SignIn(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = UserLoginSerializer(data=request.data)
#         if serializer.is_valid():
#             user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
#             if user:
#                 login(request, user)
#                 token, created = Token.objects.get_or_create(user=user)
#                 return Response({'token': token.key}, status=status.HTTP_200_OK)
#             return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



from rest_framework import generics, status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model

User = get_user_model()

class UserCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# class UserObtainAuthToken(ObtainAuthToken):
#     def post(self, request, *args, **kwargs):
#         response = super(UserObtainAuthToken, self).post(request, *args, **kwargs)
#         token = Token.objects.get(key=response.data['token'])
#         user = token.user
#         return Response({'token': token.key, 'user_id': user.id})

class UserLogout(APIView):
    def post(self, request):
        request.auth.delete()
        return Response(status=status.HTTP_200_OK)
    

class  UserObtainAuthToken(APIView):
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
