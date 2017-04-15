from django import template
from math import floor

register = template.Library()

@register.filter(name='lat')
def lat(value):

    if value > 0:
        return "{deg:02d} \N{DEGREE SIGN} {min:.4f} \' N".format(deg=floor(value),min=round((value-floor(value))*60, 4))
    else:
        return "{deg:02d} \N{DEGREE SIGN} {min:.4f} \' S".format(deg=floor(abs(value)),min=round((abs(value)-floor(abs(value)))*60, 4))


@register.filter(name='long')
def long(value):
    if value > 0:
        return "{deg:03d} \N{DEGREE SIGN} {min:.4f} \' E".format(deg=floor(value), min=round((value - floor(value)) * 60, 4))
    else:
        return "{deg:03d} \N{DEGREE SIGN} {min:.4f} \' W".format(deg=floor(abs(value)), min=round((abs(value) - floor(abs(value))) * 60, 4))