from rest_framework import serializers

from snippets.models import Snippet

class SnippetSerializer(serializers.ModelSerializer):
    owner = serializers.Field(source='owner.username')

    class Meta:
        model = Snippet
        fields = ('id', 'owner', 'created', 'title', 'code', 'linenos', 'language', 'style')  