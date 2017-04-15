from django import template
from math import floor

register = template.Library()

@register.filter(name='lat')
def lat(value):


    if value > 0:
        # return value
        return "{} \N{DEGREE SIGN} {} \' N".format(floor(value),round((value-floor(value))*60, 4))
    else:
        # return value
        return "{} \N{DEGREE SIGN} {} \' S".format(floor(abs(value)),round((abs(value)-floor(abs(value)))*60, 4))