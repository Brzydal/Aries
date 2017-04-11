from django.urls import reverse_lazy,reverse
from django.views.generic.detail import DetailView
from django.views.generic.edit import (
    CreateView,
    DeleteView,
    FormView,
    UpdateView,
    )
from django.views import View
from django.views.generic.list import ListView
from django.shortcuts import render

from .forms import PortForm, ShipForm, VoyageForm,WaypointForm
from .models import Port,Ship,Voyage,Waypoint

class IndexView(View):
    def get(self, request):
        return render(request, 'voyage/index.html', {})

# Views to create/modify/display Ships.
class ShipsView(ListView):
    model = Ship

class ShipView(DetailView):
    model = Ship

class AddShipView(CreateView):
    model = Ship
    form_class = ShipForm

class ModifyShipView(UpdateView):
    model = Ship
    fields = '__all__'

class DeleteShipView(DeleteView):
    model = Ship
    success_url = reverse_lazy('ships')

# Views to create/modify/display Ports.
class PortsView(ListView):
    model = Port

class PortView(DetailView):
    model = Port


class AddPortView(CreateView):
    model = Port
    form_class = PortForm

class ModifyPortView(UpdateView):
    model = Port
    form_class = PortForm

class DeletePortView(DeleteView):
    model = Port
    success_url = reverse_lazy('ports')


# Views to create/modify/display Voyages.
class VoyagesView(ListView):
    model = Voyage

class VoyageView(DetailView):
    model = Voyage

class AddVoyageView(CreateView):
    model = Voyage
    form_class = VoyageForm

class ModifyVoyageView(UpdateView):
    model = Voyage
    form_class = VoyageForm

class DeleteVoyageView(DeleteView):
    model = Voyage
    success_url = reverse_lazy('voyages')

# Views to create/modify/display Waypoints.
class WaypointsView(ListView):
    model = Waypoint

class WaypointView(DetailView):
    model = Waypoint

class AddWaypointView(CreateView):
    model = Waypoint
    form_class = WaypointForm

class ModifyWaypointView(UpdateView):
    model = Waypoint
    form_class = WaypointForm

class DeleteWaypointView(DeleteView):
    model = Waypoint
    success_url = reverse_lazy('waypoints')

