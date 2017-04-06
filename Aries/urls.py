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
from profiles.views import LoginView, LogoutView, ProfileView, RegisterProfileView
from voyage.views import (
    AddPortView,
    AddShipView,
    AddVoyageView,
    AddWaypointView,
    DeletePortView,
    DeleteShipView,
    DeleteVoyageView,
    DeleteWaypointView,
    IndexView,
    ModifyPortView,
    ModifyShipView,
    ModifyVoyageView,
    ModifyWaypointView,
    PortView,
    ShipView,
    VoyageView,
    WaypointView,
    PortsView,
    ShipsView,
    VoyagesView,
    WaypointsView)

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

    url(r'^ports/$', PortsView.as_view(), name='ports'),
    url(r'^port/(?P<pk>(\d)+)$', PortView.as_view(), name='port'),
    url(r'^add_port/$', AddPortView.as_view(), name='add-port'),
    url(r'^modify_port/(?P<pk>(\d)+)/$', ModifyPortView.as_view(), name='modify-port'),
    url(r'^delete_port/(?P<pk>(\d)+)/$', DeletePortView.as_view(), name='delete-port'),

    url(r'^voyages/$', VoyagesView.as_view(), name='voyages'),
    url(r'^voyage/(?P<pk>(\d)+)$', VoyageView.as_view(), name='voyage'),
    url(r'^add_voyage/$', AddVoyageView.as_view(), name='add-voyage'),
    url(r'^modify_voyage/(?P<pk>(\d)+)/$', ModifyVoyageView.as_view(), name='modify-voyage'),
    url(r'^delete_voyage/(?P<pk>(\d)+)/$', DeleteVoyageView.as_view(), name='delete-voyage'),

    url(r'^waypoints/$', WaypointsView.as_view(), name='waypoints'),
    url(r'^waypoint/(?P<pk>(\d)+)$', WaypointView.as_view(), name='waypoint'),
    url(r'^add_waypoint/$', AddWaypointView.as_view(), name='add-waypoint'),
    url(r'^modify_waypoint/(?P<pk>(\d)+)/$', ModifyWaypointView.as_view(), name='modify-waypoint'),
    url(r'^delete_waypoint/(?P<pk>(\d)+)/$', DeleteWaypointView.as_view(), name='delete-waypoint'),





]
