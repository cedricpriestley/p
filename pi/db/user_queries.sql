SELECT user.`username`, role.name, permission.name
FROM `user`
inner join user_role on user_role.user_id = user.id 
Inner join role on role.id = user_role.role_id
Inner join role_permission on role_permission.role_id = user_role.user_id
Inner join permission on permission.id = role_permission.permission_id
LIMIT 50
