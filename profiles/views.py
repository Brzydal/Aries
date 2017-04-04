from django.contrib.auth import login
from django.http import HttpResponseRedirect
from django.shortcuts import render,reverse
from django.views import View

from .forms import RegisterProfileForm

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
