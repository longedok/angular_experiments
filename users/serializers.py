from django.contrib.auth import authenticate

from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    remember = serializers.BooleanField(required=False, default=False)

    def validate(self, attrs):
        """
        Check that the start is before the stop.
        """
        username = attrs['username']
        password = attrs['password']

        if username and password:
            self.user_cache = authenticate(username=username,
                                           password=password)
            if self.user_cache is None:
                raise serializers.ValidationError("Invalid credentials")
            elif not self.user_cache.is_active:
                raise serializers.ValidationError("Inactive user")

        return attrs