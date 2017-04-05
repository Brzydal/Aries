from django import forms
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate

from .models import Profile 



class RegisterProfileForm(forms.ModelForm):
    
    class Meta:
        model = Profile
        fields = ['username', 'first_name', 'last_name', 'email', 'password']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password'].widget = forms.PasswordInput()
        self.fields['username'].help_text = None
    
    def clean(self):
        cleaned_data = super().clean()
        raw_password = cleaned_data['password']
        cleaned_data['password'] = make_password(raw_password)
        return cleaned_data


class UserProfileForm(forms.Form):
    first_name = forms.CharField(max_length=64)
    last_name = forms.CharField(max_length=64)
    email = forms.EmailField(help_text='A valid email!', widget=forms.TextInput)
    favourite_website = forms.URLField(initial='http://', widget=forms.TextInput)

    def clean(self):
        cleaned_data = super().clean()
        valid_keys = set(cleaned_data.keys())
        expected_keys = set(['email', 'first_name', 'last_name'])
        if valid_keys & expected_keys == expected_keys:
            expected_value = '{}.{}'.format(
                cleaned_data['first_name'],
                cleaned_data['last_name']).lower()
            actual_value = cleaned_data['email'].split('@')[0].lower()

            if expected_value != actual_value:
                raise forms.ValidationError('Email should contain name & surname')
        return cleaned_data


class AuthenticationForm(forms.Form):
    login = forms.CharField(label='Login', max_length=64)
    password = forms.CharField(widget=forms.PasswordInput)

    def clean(self):
        """
        Metoda dorzuca do cleaned_data, pod kluczem 'user', instancję użytkownika.
        """
        cleaned_data = super().clean()
        login = cleaned_data['login']
        password = cleaned_data['password']
        user = authenticate(username=login, password=password)

        if user is None:
            raise forms.ValidationError('Authentication Failed!')

        cleaned_data['user'] = user
        return cleaned_data