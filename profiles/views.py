from django.contrib.auth import login,logout
from django.http import HttpResponseRedirect
from django.shortcuts import render,reverse
from django.views import View
from django.views.generic.detail import DetailView
from django.views.generic.edit import FormView

from .forms import AuthenticationForm, RegisterProfileForm
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

class ProfileView(DetailView):
    model = Profile


# class UserProfileView(View):
#     def get(self, request):
#         ctx = {'form': UserProfileForm()}
#         return render(request, "profiles/user_profile.html", ctx)
#
#     def post(self, request):
#         form = UserProfileForm(data=request.POST)
#         ctx = {'form': form}
#         if form.is_valid():
#             first_name = form.cleaned_data['first_name']
#             last_name = form.cleaned_data['last_name']
#             email = form.cleaned_data['email']
#             favourite_website = form.cleaned_data['favourite_website']
#         return render(request, "profiles/user_profile.html", ctx)

class IndexView(View):
    def get(self, request):
        return render(request, 'profiles/index.html', {})

# class ListUsersView(ListView):
#     template_name = 'exercises/list_users.html'
#     model = get_profile_model()