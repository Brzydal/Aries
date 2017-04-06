from django.urls import reverse_lazy,reverse
from django.views.generic.detail import DetailView
from django.views.generic.edit import (
    CreateView,
    DeleteView,
    FormView,
    UpdateView,
    )
from django.views.generic.list import ListView
from django.shortcuts import render

from .forms import PortForm
from .models import Port,Ship,Voyage


# Views to create/modify/display Ships.
class ShipsView(ListView):
    model = Ship

class ShipView(DetailView):
    model = Ship

class AddShipView(CreateView):
    model = Ship
    fields = '__all__'

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
    fields = '__all__'

class DeletePortView(DeleteView):
    model = Port
    success_url = reverse_lazy('voyages')


# Views to create/modify/display Voyages.
class VoyagesView(ListView):
    model = Voyage

class VoyageView(DetailView):
    model = Voyage

class AddVoyageView(CreateView):
    model = Voyage
    fields = '__all__'

class ModifyVoyageView(UpdateView):
    model = Voyage
    fields = '__all__'

class DeleteVoyageView(DeleteView):
    model = Voyage
    success_url = reverse_lazy('voyages')

