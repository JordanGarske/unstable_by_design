from django.db import models

class User(models.Model):
    UserID = models.AutoField(primary_key=True)
    Username = models.CharField(max_length=255)
    Password = models.CharField(max_length=255)
    Roles = models.ManyToManyField('Role', related_name='users')
    
    def __str__(self):
        return self.Username
class Role(models.Model):
    RoleID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Description = models.CharField(max_length=255)
    Color = models.CharField(max_length=255)
    ProjectID = models.ForeignKey('Project', on_delete=models.CASCADE, related_name='roles')
    
    def __str__(self):
        return self.Name
class Project(models.Model):
    ProjectID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Description = models.CharField(max_length=255)
    Color = models.CharField(max_length=255)
    Channels = models.ManyToManyField('Channel', related_name='projects')
    
    def __str__(self):
        return self.Name
class Channel(models.Model):
    ChannelID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Description = models.CharField(max_length=255)
    Color = models.CharField(max_length=255)
    Roles = models.ManyToManyField(Role, related_name='channels')
    
    def __str__(self):
        return self.Name
class Message(models.Model):
    MessageID = models.AutoField(primary_key=True)
    AuthorID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages')
    ChannelID = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name='messages')
    MessageContent = models.CharField(max_length=255)
    
    def __str__(self):
        return self.MessageContent
class Task(models.Model):
    TaskID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Description = models.CharField(max_length=255)
    StatusID = models.ForeignKey('Status', on_delete=models.CASCADE, related_name='tasks')
    AuthorID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='authored_tasks')
    Collaborators = models.ManyToManyField(User, related_name='tasks')
    
    def __str__(self):
        return self.Name
class Status(models.Model):
    StatusID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Description = models.CharField(max_length=255)
    ProjectID = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='statuses')
    
    def __str__(self):
        return self.Name

