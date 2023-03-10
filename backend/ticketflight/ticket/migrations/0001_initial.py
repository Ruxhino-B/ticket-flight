# Generated by Django 4.1.5 on 2023-01-27 18:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import ticket.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(blank=True, null=True, upload_to=ticket.models.emp_upload_photo_to, verbose_name='Image')),
                ('role', models.CharField(choices=[('Admin', 'Admin'), ('User', 'User')], default='Anonym', max_length=10)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inbound', models.CharField(max_length=250)),
                ('outbound', models.CharField(max_length=250)),
                ('ticket_type', models.CharField(max_length=250)),
                ('ticket_type_id', models.CharField(max_length=250)),
                ('price', models.CharField(max_length=10)),
                ('from_date', models.DateTimeField()),
                ('to_date', models.DateTimeField()),
                ('seat_number', models.CharField(max_length=10)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employee', to='ticket.employee')),
            ],
        ),
    ]
