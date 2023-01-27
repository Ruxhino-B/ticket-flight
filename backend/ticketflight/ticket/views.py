from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response

from .models import Ticket
from .serialize import TicketSerialize


# Create your views here.

class TicketCreateListView(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerialize


class TicketRetriveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerialize
