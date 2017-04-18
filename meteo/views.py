from django.shortcuts import render
from django.views import View

class MeteoView(View):
    def get(self, request):
        return render(request, 'meteo/meteo.html', {})