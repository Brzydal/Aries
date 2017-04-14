
from django_countries.fields import CountryField
from django.db.models.fields import Field
from django.db import models
from django.urls import reverse
from django.contrib.gis.db import models


TYPE = (
    (1,'General Cargo'),
    (2,'Container'),
    (3,'Bulk Carrier'),
    (4,'RO-RO'),
    (5,'Product Tanker'),
    (6,'Crude Tanker'),
    (7,'LNG Tanker'),
    (8,'Chemical Tanker'),
    (9,'Heavy Lift'),
    (10,'Sailing'),
    (11,'Passenger'),
    (12,'Tug'),
    (13,'Fishing'),
    (14,'Other'),
)

class Ship(models.Model):
    name = models.CharField(max_length = 32)
    imo = models.CharField('IMO',max_length = 7, unique=True,primary_key=True)
    mmsi = models.CharField('MMSI',max_length = 9,unique=True)
    call_sign = models.CharField(max_length=5,unique=True)
    flag = CountryField()
    type = models.IntegerField(choices=TYPE)
    gross_tonnage = models.FloatField()
    deadweight = models.FloatField()
    length_overall = models.FloatField()
    breadth = models.FloatField()
    year_of_built = models.IntegerField()
    active = models.BooleanField()

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('ship', kwargs={'pk': self.pk})

class Port(models.Model):
    name = models.CharField(max_length = 64)
    position = models.PointField()
    country = CountryField()
    shipyard = models.BooleanField()

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('port', kwargs={'pk': self.pk})

class Voyage(models.Model):
    name = models.CharField(max_length = 64)
    departure_port = models.OneToOneField(Port, related_name='departure_port')
    etd = models.DateTimeField('Estimated Time of Departure')
    arrival_port = models.OneToOneField(Port,related_name='arrival_port')
    eta = models.DateTimeField('Estimated Time of Arrival')
    distance = models.FloatField()

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('voyage', kwargs={'pk': self.pk})

class Waypoint(models.Model):
    name = models.CharField(max_length=64)
    position = models.PointField()
    time = models.DateTimeField()
    leg_distance = models.FloatField()
    leg_course = models.FloatField()
    voyage = models.ForeignKey(Voyage)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('waypoint', kwargs={'pk': self.pk})



