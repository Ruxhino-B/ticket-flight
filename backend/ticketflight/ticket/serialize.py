from rest_framework import serializers

from .models import Employee, Ticket
from django.contrib.auth.models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')
class EmployeeSerialize(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Employee
        fields = '__all__'
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('user', 'photo', 'role',)
        model = Employee


class TicketSerialize(serializers.ModelSerializer):
    employee = EmployeeSerialize()

    class Meta:
        model = Ticket
        fields = '__all__'


class TicketSerializeCreate(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'
