# Generated by Django 4.2 on 2023-04-15 17:34

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
                ('ProjectID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Roles', to='projectmanagement.project')),
            ],
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('StatusID', models.AutoField(primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=255)),
                ('Description', models.CharField(max_length=255)),
                ('ProjectID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Statuses', to='projectmanagement.project')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('UserID', models.AutoField(primary_key=True, serialize=False)),
                ('Username', models.CharField(max_length=255)),
                ('Password', models.CharField(max_length=255)),
                ('Roles', models.ManyToManyField(related_name='Users', to='projectmanagement.role')),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('TaskID', models.AutoField(primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=255)),
                ('Description', models.CharField(max_length=255)),
                ('AuthorID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Authored_Tasks', to='projectmanagement.user')),
                ('Collaborators', models.ManyToManyField(related_name='Tasks', to='projectmanagement.user')),
                ('StatusID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Tasks', to='projectmanagement.status')),
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
                ('ChannelID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projectmanagement.channel')),
                ('RoleID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projectmanagement.role')),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('MessageID', models.AutoField(primary_key=True, serialize=False)),
                ('MessageContent', models.CharField(max_length=255)),
                ('AuthorID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Messages', to='projectmanagement.user')),
                ('ChannelID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Messages', to='projectmanagement.channel')),
            ],
        ),
        migrations.AddField(
            model_name='channel',
            name='ProjectID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Channels', to='projectmanagement.project'),
        ),
        migrations.AddField(
            model_name='channel',
            name='Roles',
            field=models.ManyToManyField(related_name='Channels', through='projectmanagement.RoleToChannel', to='projectmanagement.role'),
        ),
    ]