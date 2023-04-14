from django.db import models

class Project(models.Model):
    ProjectID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Description = models.CharField(max_length=255)
    Color = models.CharField(max_length=255)

    def __str__(self):
        return self.Name

class Role(models.Model):
    RoleID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Description = models.CharField(max_length=255)
    Color = models.CharField(max_length=255)
    ProjectID = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='Roles')

    def __str__(self):
        return self.Name

class Channel(models.Model):
    ChannelID = models.AutoField(primary_key=True)
    ProjectID = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='Channels')
    Name = models.CharField(max_length=255)
    Description = models.CharField(max_length=255)
    Color = models.CharField(max_length=255)
    Roles = models.ManyToManyField(Role, related_name='Channels', through='RoleToChannel')

    def __str__(self):
        return self.Name

class RoleToChannel(models.Model):
    ChannelID = models.ForeignKey(Channel, on_delete=models.CASCADE)
    RoleID = models.ForeignKey(Role, on_delete=models.CASCADE)
    Create = models.BooleanField()
    Read = models.BooleanField()
    Update = models.BooleanField()
    Delete = models.BooleanField()

    def __str__(self):
        return f'{self.ChannelID}, {self.RoleID}'

class User(models.Model):
    UserID = models.AutoField(primary_key=True)
    Username = models.CharField(max_length=255)
    Password = models.CharField(max_length=255)
    Roles = models.ManyToManyField(Role, related_name='Users')

    def __str__(self):
        return self.Username

class Message(models.Model):
    MessageID = models.AutoField(primary_key=True)
    AuthorID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Messages')
    ChannelID = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name='Messages')
    MessageContent = models.CharField(max_length=255)

    def __str__(self):
        return self.MessageContent

class Status(models.Model):
    StatusID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Description = models.CharField(max_length=255)
    ProjectID = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='Statuses')

    def __str__(self):
        return self.Name

class Task(models.Model):
    TaskID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Description = models.CharField(max_length=255)
    StatusID = models.ForeignKey(Status, on_delete=models.CASCADE, related_name='Tasks')
    AuthorID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Authored_Tasks')
    Collaborators = models.ManyToManyField(User, related_name='Tasks')

    def __str__(self):
        return self.Name
