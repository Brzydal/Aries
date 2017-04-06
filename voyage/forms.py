from django import forms
from mapwidgets.widgets import GooglePointFieldWidget
from .models import Port,Voyage

import floppyforms.__future__ as forms

class PointWidget(forms.gis.PointWidget, forms.gis.BaseGMapWidget):
    google_maps_api_key = 'AIzaSyBsLzO7lckWXomSRWsCap6JuqB3XYMrTNY'

class PortForm(forms.ModelForm):

    class Meta:
        model = Port
        fields = ['name','position','country','shipyard']

        widgets = {
            'position': PointWidget(attrs={
            'display_wkt': True,
            'map_srid': 4326,
            'map_width': 700,
            'map_height': 500, })}

class VoyageForm(forms.ModelForm):
    class Meta:
        model = Voyage
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['begining_time'].help_text = 'YYYY-MM-DD HH:MM:SS'
        self.fields['end_time'].help_text = 'YYYY-MM-DD HH:MM:SS'








