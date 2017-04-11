from django import forms
from datetimewidget.widgets import DateTimeWidget #import for Datetimepickers
from django.core.exceptions import ValidationError
import floppyforms.__future__ as forms # import for widget for Waypoint
from mapwidgets.widgets import GooglePointFieldWidget # import for widget for Port

from .models import Port, Ship, Voyage,Waypoint
from .validators import imo_number

# Creation of widget for Waypoints
class PointWidget(forms.gis.PointWidget, forms.gis.BaseGMapWidget):
    google_maps_api_key = 'AIzaSyBsLzO7lckWXomSRWsCap6JuqB3XYMrTNY'

class ShipForm(forms.ModelForm):

    class Meta:
        model = Ship
        fields = '__all__'

    def clean_imo(self): # Validation for IMO number
        value = self.cleaned_data['imo']
        result = 0
        for idx, n in enumerate(value[:-1]):
            result += int(str(n)) * (7 - idx)
        if str(result)[-1] != value[-1] or len(value) != 7:
            raise ValidationError('This is not a proper IMO number.')
        else:
            return value

    def clean_mmsi(self): # Validation for MMSI number
        value = self.cleaned_data['mmsi']
        if int(value[0])<2 or int(value[0])>7 or len(value) != 9:
            raise ValidationError('This is not a proper MMSI number.')
        else:
            return value

class PortForm(forms.ModelForm):

    class Meta:
        model = Port
        fields = ['name','position','country','shipyard']

        widgets = {
            'position': GooglePointFieldWidget(attrs={
            'display_wkt': True,
            'map_srid': 4326,
            'map_width': 700,
            'map_height': 500, })}

class VoyageForm(forms.ModelForm):
    class Meta:
        model = Voyage
        fields = '__all__'

        widgets = {
            'begining_time': DateTimeWidget(attrs={'id': "begining_time"}),
            'end_time': DateTimeWidget(attrs={'id': "end_time"}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['begining_time'].help_text = 'YYYY-MM-DD HH:MM:SS'
        self.fields['end_time'].help_text = 'YYYY-MM-DD HH:MM:SS'


class WaypointForm(forms.ModelForm):

    class Meta:
        model = Waypoint
        fields = '__all__'

        widgets = {
            'position': PointWidget(attrs={
            'display_wkt': True,
            'map_srid': 4326,
            'map_width': 700,
            'map_height': 500, }),

            'time': DateTimeWidget(attrs={'id': "waypoint_time"}),
        }








