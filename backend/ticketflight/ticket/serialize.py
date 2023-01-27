from rest_framework import serializers

from .models import Employee, Ticket


class EmployeeSerialize(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class TicketSerialize(serializers.ModelSerializer):
    employee = EmployeeSerialize()

    class Meta:
        model = Ticket
        fields = '__all__'


class TicketSerializeCreate(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'
