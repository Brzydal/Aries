from django.core.exceptions import ValidationError


def imo_number(value):
    result = 0
    for idx, n in enumerate(str(value[:-1])):
        result += int(str(n)) * (7 - idx)

    print(result)

    if str(result)[-1] != value[-1]:
        raise ValidationError('This is not a proper IMO number.')
