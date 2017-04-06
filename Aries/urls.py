"""Aries URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from profiles.views import IndexView,LoginView, LogoutView, ProfileView, RegisterProfileView
from voyage.views import (
    AddShipView,
    AddVoyageView,
    DeleteShipView,
    DeleteVoyageView,
    ModifyShipView,
    ModifyVoyageView,
    ShipView,
    VoyageView,
    ShipsView,
    VoyagesView)

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^register/$', RegisterProfileView.as_view(), name='register'),
    url(r'^profile/(?P<pk>(\d)+)$', ProfileView.as_view(), name='profile'),
    url(r'^login/$', LoginView.as_view(), name='login'),
    url(r'^logout/$', LogoutView.as_view(), name='logout'),

    url(r'^index/$', IndexView.as_view(), name='index'),

    url(r'^ships/$', ShipsView.as_view(), name='ships'),
    url(r'^ship/(?P<pk>(\d)+)$', ShipView.as_view(), name='ship'),
    url(r'^add_ship/$', AddShipView.as_view(), name='add-ship'),
    url(r'^modify_ship/(?P<pk>(\d)+)/$', ModifyShipView.as_view(), name='modify-ship'),
    url(r'^delete_ship/(?P<pk>(\d)+)/$', DeleteShipView.as_view(), name='delete-ship'),

    url(r'^voyages/$', VoyagesView.as_view(), name='voyages'),
    url(r'^voyage/(?P<pk>(\d)+)$', VoyageView.as_view(), name='voyage'),
    url(r'^add_voyage/$', AddVoyageView.as_view(), name='add-voyage'),
    url(r'^modify_voyage/(?P<pk>(\d)+)/$', ModifyVoyageView.as_view(), name='modify-voyage'),
    url(r'^delete_voyage/(?P<pk>(\d)+)/$', DeleteVoyageView.as_view(), name='delete-voyage'),





]
