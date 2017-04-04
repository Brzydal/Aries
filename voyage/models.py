from django.db.models.fields import Field
from django.db import models
from django.contrib.gis.db import models

TYPE = (
    (1,'Fishing'),
    (2,'Container'),
    (3,'Tanker'),
    (4,'Passnger')
)

class Ship(models.Model):
    name = models.CharField(max_length = 32)
    imo = models.CharField(max_length = 7, unique=True,primary_key=True)
    mmsi = models.CharField(max_length = 9,unique=True)
    call_sign = models.CharField(max_length=5,unique=True)
    flag = models.CharField(max_length =16)
    type = models.IntegerField(choices=TYPE)
    gross_tonnage = models.FloatField()
    deadweight = models.FloatField()
    length_overall = models.FloatField()
    breadth = models.FloatField()
    year_of_built = models.IntegerField()
    active = models.BooleanField()

class Port(models.Model):
    name = models.CharField(max_length = 64)
    position = models.PointField()
    country = models.CharField(max_length = 16)
    shipyard = models.BooleanField()

class Voyage(models.Model):
    name = models.CharField(max_length = 64)
    arrival_port = models.OneToOneField(Port,related_name='arrival_port')
    departure_port= models.OneToOneField(Port, related_name='departure_port')
    distance = models.FloatField()
    begining_time = models.DateTimeField()
    end_time = models.DateTimeField()

class Waypoint(models.Model):
    name = models.CharField(max_length=64)
    position = models.PointField()
    time = models.DateTimeField()
    leg_distance = models.FloatField()
    leg_course = models.FloatField()
    voyage = models.ForeignKey(Voyage)



