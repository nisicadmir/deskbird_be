# What can be improved

- I made it possible that when creating a new user you can set the user password from the UI side. In production mode you should only invite an user who will accept the invite via email and set password afterwards.

- I did not care much about the migrations. I set syncrhonize true for TypeOrmModule. Before the seed is run you need to start the application so the tables are set.

```
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.database.url,
      entities: [User],
      synchronize: true, // <- this variable
    }),
```

- For list of users I did not use any pagination nor filtering. List will return list of all users sorted by createdAt in ascending order. For production mode there should be:
- - pagination skip limit or key set pagination
- - filtering by columns
- - sorting
- - eventually full text search by email/fullName fields

## Testing

I did not write a single test (unit nor integration).
