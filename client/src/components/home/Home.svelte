<script>
  import { toast } from "@zerodevx/svelte-toast";

  let name = "";
  fetch("/api/user")
    .then((res) => res.json())
    .then((result) => {
      name = result.name;
    });

  
  let tasks = []
  fetch("/api/home")
  .then(res => res.json())
  .then(result => {
    tasks = result[0].tasks
    console.log(tasks)
  })

</script>

<h1>Home</h1>
<div class="container-textarea">
  <form action="/home" method="POST">
    <h3>Write your task to property manager here</h3>
    <textarea name="tasktextarea" id="" cols="60" rows="5" />
    <br>
    <button type="submit">Add task</button>
  </form>
</div>
<br />


{#each tasks as task}
<div class="container">
  <div><p>Writer: {task.writer} <br> Date: {task.date}</p></div>
  <div><p>Task: <br> {task.task}</p></div>
  <div><p>Options: <br> Edit/Delete</p></div>
</div>
{/each}

{#if name}
  {toast.push(`Welcome ${name}`, {
    theme: {
      "--toastColor": "mintcream",
      "--toastBackground": "rgba(72,187,120,0.9)",
      "--toastBarBackground": "#2F855A",
    },
  })}
{/if}

<style>
  h3{
    color: #56baed;
  }

  .container-textarea {
    display: grid;
    text-align: center;
  }

  .container {
    display: flex;
  }

  .container > div {
    flex: 1; /*grow*/
  }

  textarea {
    background-color: black;
    color: white;
  }

  button {
    background-color: #56baed;
    border: none;
    color: white;
    padding: 15px 80px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 13px;
    -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    margin: 5px 20px 40px 20px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
  p {
    color: whitesmoke;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    text-align: center;
  }

</style>
