from rest_framework import serializers
from .models import User, Project, Role, RoleToChannel, Channel, Message, Status, Task
from .functions import attempt_json_deserialize


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['ProjectID', 'Name', 'Description', 'Color', 'Roles', 'Statuses']
    
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'
        extra_kwargs = {'Users': {'required': False}}
    
    def create(self, validated_data):
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['UserID', 'Username', 'Password', 'Roles']
        extra_kwargs = {'Roles': {'required': False}}

    # def create(self, validated_data):
    #     request = self.context['request']
    #     roles_data = validated_data.pop('Roles')
    #     roles = []
    #     user = User.objects.create(**validated_data)
    #     for i in roles_data:
    #         try:
    #             p = Role.objects.create(**i)
    #             roles.append(p)
    #         except:
    #             pass
    #     user.Roles.set(roles)
    #     return user
    

    # def update(self, instance, validated_data):
    #     request = self.context['request']
    #     roles_data = validated_data.pop('Roles')
    #     roles = []
    #     user = User.objects.create(**validated_data)
    #     for i in roles_data:
    #         try:
    #             p = Role.objects.create(**i)
    #             roles.append(p)
    #         except:
    #             pass
    #     user.Roles.update(roles)
    #     return user

class RoleToChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoleToChannel
        fields = '__all__'

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = '__all__'

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
