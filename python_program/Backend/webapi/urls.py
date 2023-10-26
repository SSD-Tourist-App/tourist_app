from django.urls import path

from django.urls import path
from .views import SignUp, SignIn




from .views import (
    CategoryListCreateView,
    CategoryRetrivalUpdateDeleteView,
    PlaceCreateView,
    PlaceRetrivalUpdateDeleteView,
    ReviewListCreate,
    ReviewRetrivalUpdateDeleteView
)

urlpatterns = [
    path('', CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryRetrivalUpdateDeleteView.as_view(), name='category-lreview-retirve-update'),
    path('places/', PlaceCreateView.as_view(), name='place-list-create'),
    path('places/<int:pk>/', PlaceRetrivalUpdateDeleteView.as_view(), name='place-retirve-update'),
    path('reviews/', ReviewListCreate.as_view(), name='review-list-create'),
    path('reviewsclaer/<int:pk>/', ReviewRetrivalUpdateDeleteView.as_view(), name='review-retirve-update'),
    path('signup/', SignUp.as_view(), name='signup'),
    path('signin/', SignIn.as_view(), name='signin'),



]
