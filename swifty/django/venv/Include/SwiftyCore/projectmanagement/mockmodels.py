from .models import Project, Channel, Message, RoleToChannel, Role, Status, Task, User

# Create a project
project1 = Project.objects.create(Name='Project1', Description='This is the first project', Color='blue')

# Create a role
role1 = Role.objects.create(Name='Role1', Description='This is the first role', Color='green', ProjectID=project1)

# Create another role
role2 = Role.objects.create(Name='Role2', Description='This is the second role', Color='purple', ProjectID=project1)

# Create a channel
channel1 = Channel.objects.create(Name='Channel1', Description='This is the first channel', Color='red', ProjectID=project1)

# Create another channel
channel2 = Channel.objects.create(Name='Channel2', Description='This is the second channel', Color='yellow', ProjectID=project1)

# Add a role to a channel
RoleToChannel.objects.create(ChannelID=channel1, RoleID=role1, Create=True, Read=True, Update=True, Delete=True)

# Add another role to a channel
RoleToChannel.objects.create(ChannelID=channel2, RoleID=role2, Create=True, Read=False, Update=True, Delete=False)

# Create a user
user1 = User.objects.create(Username='user1', Password='password1')

# Create another user
user2 = User.objects.create(Username='user2', Password='password2')

# Add roles to a user
user1.Roles.add(role1)
user2.Roles.add(role2)

# Create a message
message1 = Message.objects.create(AuthorID=user1, ChannelID=channel1, MessageContent='This is the first message')

# Create another message
message2 = Message.objects.create(AuthorID=user2, ChannelID=channel2, MessageContent='This is the second message')

# Create a status
status1 = Status.objects.create(Name='Status1', Description='This is the first status', ProjectID=project1)

# Create another status
status2 = Status.objects.create(Name='Status2', Description='This is the second status', ProjectID=project1)

# Create a task
task1 = Task.objects.create(Name='Task1', Description='This is the first task', StatusID=status1, AuthorID=user1)

# Create another task
task2 = Task.objects.create(Name='Task2', Description='This is the second task', StatusID=status2, AuthorID=user2)

# Add a collaborator to a task
task1.Collaborators.add(user1)
task1.Collaborators.add(user2)

# Add another collaborator to a task
task2.Collaborators.add(user1) 
