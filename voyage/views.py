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

from .models import Voyage

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
# Create your views here.
