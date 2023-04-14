# Generated by Django 4.1.7 on 2023-04-14 20:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('ChannelID', models.AutoField(primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=255)),
                ('Description', models.CharField(max_length=255)),
                ('Color', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('ProjectID', models.AutoField(primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=255)),
                ('Description', models.CharField(max_length=255)),
                ('Color', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('RoleID', models.AutoField(primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=255)),
                ('Description', models.CharField(max_length=255)),
                ('Color', models.CharField(max_length=255)),
                ('ProjectID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Roles', to='Projects.project')),
            ],
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('StatusID', models.AutoField(primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=255)),
                ('Description', models.CharField(max_length=255)),
                ('ProjectID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Statuses', to='Projects.project')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('UserID', models.AutoField(primary_key=True, serialize=False)),
                ('Username', models.CharField(max_length=255)),
                ('Password', models.CharField(max_length=255)),
                ('Roles', models.ManyToManyField(related_name='Users', to='Projects.role')),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('TaskID', models.AutoField(primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=255)),
                ('Description', models.CharField(max_length=255)),
                ('AuthorID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Authored_Tasks', to='Projects.user')),
                ('Collaborators', models.ManyToManyField(related_name='Tasks', to='Projects.user')),
                ('StatusID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Tasks', to='Projects.status')),
            ],
        ),
        migrations.CreateModel(
            name='RoleToChannel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Create', models.BooleanField()),
                ('Read', models.BooleanField()),
                ('Update', models.BooleanField()),
                ('Delete', models.BooleanField()),
                ('ChannelID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Projects.channel')),
                ('RoleID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Projects.role')),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('MessageID', models.AutoField(primary_key=True, serialize=False)),
                ('MessageContent', models.CharField(max_length=255)),
                ('AuthorID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Messages', to='Projects.user')),
                ('ChannelID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Messages', to='Projects.channel')),
            ],
        ),
        migrations.AddField(
            model_name='channel',
            name='ProjectID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Channels', to='Projects.project'),
        ),
        migrations.AddField(
            model_name='channel',
            name='Roles',
            field=models.ManyToManyField(related_name='Channels', through='Projects.RoleToChannel', to='Projects.role'),
        ),
    ]
