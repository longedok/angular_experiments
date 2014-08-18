from django.shortcuts import render

from rest_framework import viewsets

from snippets.models import Snippet
from snippets.serializers import SnippetSerializer


class SnippetViewSet(viewsets.ModelViewSet):
	"""
	This viewset automatically provides `list`, `create`, `retrieve`,
	`update` and `destroy` actions.
	"""
	queryset = Snippet.objects.all().order_by('-created')
	serializer_class = SnippetSerializer