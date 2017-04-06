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
    AddVoyageView,
    DeleteVoyageView,
    ModifyVoyageView,
    VoyageView,
    VoyagesView)

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^register/$', RegisterProfileView.as_view(), name='register'),
    url(r'^profile/(?P<pk>(\d)+)$', ProfileView.as_view(), name='profile'),
    url(r'^login/$', LoginView.as_view(), name='login'),
    url(r'^logout/$', LogoutView.as_view(), name='logout'),

    url(r'^index/$', IndexView.as_view(), name='index'),

    url(r'^voyages/$', VoyagesView.as_view(), name='voyages'),
    url(r'^voyage/(?P<pk>(\d)+)$', VoyageView.as_view(), name='voyage'),
    url(r'^add_voyage/$', AddVoyageView.as_view(), name='add-voyage'),
    url(r'^modify_voyage/(?P<pk>(\d)+)/$', ModifyVoyageView.as_view(), name='modify-voyage'),
    url(r'^delete_voyage/(?P<pk>(\d)+)/$', DeleteVoyageView.as_view(), name='delete-voyage'),



]
