from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


# Create your models here.

def emp_upload_photo_to(instance, filename):
    return 'employee/{filename}'.format(filename=filename)


class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.ImageField(_("Image"), upload_to=emp_upload_photo_to, null=True, blank=True)
    role = models.CharField(choices=(("Admin", "Admin"), ("User", "User")), max_length=10, default='Anonym')

    def __str__(self):
        return self.user.username


class Ticket(models.Model):
    employee = models.ForeignKey(Employee, related_name='employee', on_delete=models.CASCADE)
    inbound = models.CharField(max_length=250)
    outbound = models.CharField(max_length=250)
    ticket_type = models.CharField(max_length=250)
    ticket_type_id = models.CharField(max_length=250)
    price = models.CharField(max_length=10)
    from_date = models.DateTimeField()
    to_date = models.DateTimeField()
    seat_number = models.CharField(max_length=10)

    def __str__(self):
        return self.ticket_type_id
