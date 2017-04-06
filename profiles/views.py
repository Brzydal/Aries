from django.contrib.auth import login,logout
from django.http import HttpResponseRedirect
from django.shortcuts import render,reverse
from django.views import View
from django.views.generic.detail import DetailView
from django.views.generic.edit import FormView,UpdateView

from .forms import AuthenticationForm, RegisterProfileForm,ProfileForm
from .models import Profile

class RegisterProfileView(View):
    
    def get(self,request):
        form = RegisterProfileForm()
        ctx = {'form':form}
        return render(request,'profiles/register_profile_form.html',ctx)
    
    def post(self,request):
        form = RegisterProfileForm(data=request.POST)
        ctx = {'form':form}
        if form.is_valid():
            profile = form.save()
            login(request,profile)
            return HttpResponseRedirect(reverse('index'))
        else:
            return render(request,'profiles/register_profile_form.html',ctx)


class LoginView(FormView):
    template_name = 'profiles/login.html'
    form_class = AuthenticationForm
    success_url = '/index/'

    def form_valid(self, form):
        user = form.cleaned_data['user']
        login(self.request, user)
        return HttpResponseRedirect(reverse('index'))

    def form_invalid(self, form):
        ctx = {'form': form}
        return render(self.request, "profiles/login.html", ctx)


class LogoutView(View):
    def get(self, request):
        logout(request)
        return HttpResponseRedirect(reverse('login'))

class ProfileView(UpdateView):
    model = Profile
    form_class = ProfileForm


