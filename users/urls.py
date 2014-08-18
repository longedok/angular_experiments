from django.conf.urls import patterns
from django.conf.urls import url
from users.views import LoginView
from django.contrib.auth import views as auth_views

urlpatterns = patterns('',
       url(r'^login/$', LoginView.as_view(), name='auth_login'),
       url(r'^logout/$', auth_views.logout, {'next_page': '/'}, name='auth_logout'),
)