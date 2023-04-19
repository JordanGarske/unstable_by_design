from .models import Project, Channel,Message,RoleToChannel,Role,Status,Task,User
# Create a project
project1 = Project.objects.create(Name='Project1', Description='This is the first project', Color='blue')

# Create a role
role1 = Role.objects.create(Name='Role1', Description='This is the first role', Color='green', ProjectID=project1)

# Create a channel
channel1 = Channel.objects.create(Name='Channel1', Description='This is the first channel', Color='red', ProjectID=project1)

# Add a role to a channel
RoleToChannel.objects.create(ChannelID=channel1, RoleID=role1, Create=True, Read=True, Update=True, Delete=True)

# Create a user
user1 = User.objects.create(Username='user1', Password='password1')

# Add a role to a user
user1.Roles.add(role1)

# Create a message
message1 = Message.objects.create(AuthorID=user1, ChannelID=channel1, MessageContent='This is the first message')

# Create a status
status1 = Status.objects.create(Name='Status1', Description='This is the first status', ProjectID=project1)

# Create a task
task1 = Task.objects.create(Name='Task1', Description='This is the first task', StatusID=status1, AuthorID=user1)

# Add a collaborator to a task
task1.Collaborators.add(user1)