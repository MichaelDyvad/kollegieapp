<script>
  let role = ""
fetch("/api/isadmin")
    .then(res => res.json())
    .then(result => {
        role = result.role
    });

    let name = "";
    fetch("/api/user")
      .then((res) => res.json())
      .then((result) => {
        name = result.name;
    });
</script>


<ul>
    <li><a href="/">Beerfridge</a></li>
    <li><a href="/laundry">Laundry</a></li>
    <li><a href="/home">Home</a></li>
    <li><a href="/tasks">Tasks</a></li>
    <li><a href="/login">Login</a></li>
    <li><a href="/signup">Signup</a></li>
    <li><a href="/logout">Logout</a></li>
    <li id="solo"><a><span>ROLE: {role}</span></a></li>
    <li id="solo"><a><span>USER: {name}</span></a></li>
    

</ul>

<style>
    ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: rgb(59, 59, 59);
}

li {
  float:left;
}

li a {
  display: block;
  color: #56baed;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

#solo{
  float:right;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}
</style>