# Generated by Django 3.2.8 on 2023-04-11 03:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(max_length=11, verbose_name='Телефон нөмер')),
                ('fullname', models.CharField(default='', max_length=40, verbose_name='Аты-жөні')),
                ('is_staff', models.BooleanField(verbose_name='Қызметші?')),
            ],
            options={
                'verbose_name': 'Аккауант',
                'verbose_name_plural': 'Аккауанттар',
                'db_table': 'user',
            },
        ),
    ]
