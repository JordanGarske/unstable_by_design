from rest_framework import serializers
from .models import User, Project, Role, RoleToChannel, Channel, Message, Status, Task
from .functions import attempt_json_deserialize


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
    # Roles = RoleSerializer(many=True, read_only=False)
    class Meta:
        model = User
        fields = ['UserID', 'Username', 'Password', 'Roles']
        extra_kwargs = {'Roles': {'required': False}}

    # def create(self, validated_data):
    #     request = self.context['request']

    #     user_id = request.data.get('UserID')
    #     user_id = attempt_json_deserialize(user_id, expect_type=int)
    #     validated_data['userID'] = user_id

    #     username = request.data.get('Username')
    #     username = attempt_json_deserialize(username, expect_type=str)
    #     validated_data['Username'] = username

    #     password = request.data.get('Password')
    #     password = attempt_json_deserialize(password, expect_type=str)
    #     validated_data['Password'] = password

    #     roles_data = request.data.get('Roles')
    #     roles_data = attempt_json_deserialize(roles_data, expect_type=list)
    #     validated_data['Roles'] = roles_data

    #     instance = super().create(validated_data)

    #     return instance
    

    # def update(self, instance, validated_data):
    #     request = self.context['request']

    #     user_id = request.data.get('UserID')
    #     user_id = attempt_json_deserialize(user_id, expect_type=str)
    #     validated_data['UserID'] = user_id

    #     box_data = request.data.get('box')
    #     box_data = attempt_json_deserialize(box_data, expect_type=dict)
    #     box = Box.objects.create(**box_data)
    #     validated_data['box'] = box

    #     toppings_data = request.data.get('toppings')
    #     toppings_ids = attempt_json_deserialize(toppings_data, expect_type=list)
    #     validated_data['toppings'] = toppings_ids

    #     instance = super().update(instance, validated_data)

    #     return instance

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
