from django.conf.urls import patterns, url, include

from rest_framework.routers import DefaultRouter

from snippets import views

router = DefaultRouter()
router.register(r'snippets', views.SnippetViewSet)

urlpatterns = patterns('',
	url(r'^', include(router.urls))
)