from django import forms
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError

from .models import Profile 



class RegisterProfileForm(forms.ModelForm):
    confirm_password = forms.CharField(label='Confirm Password')

    class Meta:
        model = Profile
        fields = ['username', 'first_name', 'last_name', 'email', 'password']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password'].widget = forms.PasswordInput()
        self.fields['confirm_password'].widget = forms.PasswordInput()
        self.fields['username'].help_text = None
    
    def clean(self):
        cleaned_data = super().clean()
        raw_password = cleaned_data['password']
        con_password = cleaned_data['confirm_password']
        if raw_password != con_password:
            raise ValidationError('Password does not match Confirm Password')
        cleaned_data['password'] = make_password(raw_password)
        return cleaned_data



class ProfileForm(forms.ModelForm):
    confirm_password = forms.CharField(label='Confirm Password')
    class Meta:
        model = Profile
        fields = ['username', 'first_name', 'last_name', 'email', 'password']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password'].widget = forms.PasswordInput()
        self.fields['confirm_password'].widget = forms.PasswordInput()
        self.fields['username'].help_text = None
        self.fields['username'].widget.attrs['readonly'] = True

    def clean(self):
        cleaned_data = super().clean()
        raw_password = cleaned_data['password']
        con_password = cleaned_data['confirm_password']
        if raw_password != con_password:
            raise ValidationError('Password does not match Confirm Password')
        cleaned_data['password'] = make_password(raw_password)
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