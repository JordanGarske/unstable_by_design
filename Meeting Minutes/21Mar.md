# Meeting minutes 03/21/23

Goal:Scope of the project

Role: defines access control
Entities: User, Role, Project(used as a validator), Tickets, Message

User--[user role]--role(permission data)----project---[]---user
 

tickets: one to many to project

Role:
1. name of the role
2. unique id
3. permission level

- Roles view will have can edit or view 