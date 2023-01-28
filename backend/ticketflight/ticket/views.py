from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response

from .models import Ticket, Employee
from .serialize import TicketSerialize, EmployeeSerializer, TicketSerializeCreate


# Create your views here.

class GetEmployeRoleDetail(generics.RetrieveAPIView):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

class TicketCreateListView(generics.ListAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerialize

class TicketCreate(generics.CreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializeCreate

class TicketRetriveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerialize
