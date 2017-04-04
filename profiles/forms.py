from django import forms
from django.contrib.auth.hashers import make_password

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