<script>
  let role = "";
  fetch("/api/isadmin")
    .then((res) => res.json())
    .then((result) => {
      role = result.role;
    });

  let email = "";
  fetch("/api/user")
    .then((res) => res.json())
    .then((result) => {
      email = result.name;
    });
</script>

<ul>
  <li><a href="/">Beerfridge</a></li>
  <li><a href="/laundry">Laundry</a></li>
  <li><a href="/home">Home</a></li>
  <li><a href="/tasks">Tasks</a></li>
  <li><a href="/admin">Admin</a></li>

  <div class="dropdown">
    <button class="dropbtn">Admin options</button>
    <div class="dropdown-content">
      <a href="/editresident">Edit resident</a>
      <a href="/editassortment">Edit assortment</a>
    </div>
  </div>

  <li><a href="/logout">Logout</a></li>
  <li id="solo"><a><span>ROLE: {role}</span></a></li>
  <li id="solo"><a><span>USER: {email}</span></a></li>
</ul>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    background-color: rgb(59, 59, 59);
  }

  li {
    float: left;
  }

  li a {
    display: block;
    color: #56baed;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  #solo {
    float: right;
  }

  /* Change the link color to #111 (black) on hover */
  li a:hover {
    background-color: #111;
  }

  /* Dropdown Button */
  .dropbtn {
    background-color: #56baed;
    color: white;
    padding: 14px;
    font-size: 16px;
    border: none;
  }

  /* The container <div> - needed to position the dropdown content */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: rgb(59, 59, 59);
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  /* Links inside the dropdown */
  .dropdown-content a {
    display: block;
    color: #56baed;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  /* Change color of dropdown links on hover */
  .dropdown-content a:hover {
    background-color: #111;
  }

  /* Show the dropdown menu on hover */
  .dropdown:hover .dropdown-content {
    display: block;
  }

  /* Change the background color of the dropdown button when the dropdown content is shown */
  .dropdown:hover .dropbtn {
    background-color: #56baed;
  }
</style>
