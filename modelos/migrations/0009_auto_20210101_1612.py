# Generated by Django 3.1.2 on 2021-01-01 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modelos', '0008_auto_20201222_1910'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pago',
            name='punitorios',
            field=models.FloatField(max_length=30, null=True),
        ),
    ]
