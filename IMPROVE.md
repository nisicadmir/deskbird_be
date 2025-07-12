# BE

- I made it possible that when creating a new user you can set the user password from the UI side. In production mode you should only invite an user who will accept the invite via email and set password afterwards.

- For list of users I did not use any pagination nor filtering. List will return list of all users sorted by createdAt in ascending order. For production mode there should be:
- pagination skip limit or key set pagination
- filtering by columns
- sorting
- eventually full text search by email/fullName fields
