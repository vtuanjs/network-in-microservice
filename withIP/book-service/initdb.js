db.createUser({
  user: "dbtest",
  pwd: "dbtest",
  roles: [
    { role: "readWrite", db: "dbtest" }
  ]
})