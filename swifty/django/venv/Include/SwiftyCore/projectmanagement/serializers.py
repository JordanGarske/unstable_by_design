from rest_framework import serializers
from .models import User, Project, Role, RoleToChannel, Channel, Message, Status, Task



class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['ProjectID', 'Name', 'Description', 'Color']
    
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['RoleID', 'Name', 'Description', 'Color', 'ProjectID']
        extra_kwargs = {'Users': {'required': False}}

class UserSerializer(serializers.ModelSerializer):
    Roles = RoleSerializer(many=True, read_only=False)
    class Meta:
        model = User
        fields = ['UserID', 'Username', 'Password', 'Roles']
        extra_kwargs = {'Roles': {'required': False}}

class RoleToChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoleToChannel
        fields = []

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = []

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['MessageID', 'AuthorID', 'ChannelID', 'MessageContent']

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ['StatusID', 'Name', 'Description', 'ProjectID']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['TaskID', 'Name', 'Description', 'StatusID', 'AuthorID']
