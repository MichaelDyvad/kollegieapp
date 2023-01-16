<script>
    import Modal from "../modal/Modal.svelte";

    let name = "";
    fetch("/api/user")
        .then((res) => res.json())
        .then((result) => {
            name = result.name;
    });

    let tasksArray = [];
    fetch("/api/tasks")
        .then((res) => res.json())
        .then((result) => {
            tasksArray = result[0].tasks;
        });

    
    let showModal = false;

    let editModalValue;
    let taskId;
    function openModal(e) {
        e.preventDefault();
        taskId = e.target.parentElement.parentElement.id
        fetch("/api/tasks/" + taskId)
        .then(res => res.json())
        .then(result => {
            editModalValue = result[0].task[0].task
        })
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    let taskText;
    const postTask = async () => {
        await fetch("/api/tasks", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  task: taskText,
                  writer: "",
                  date: ""
              })
          })
          .then(res => res.json())
          .then(result => {
            tasksArray = [...tasksArray, result.tasks]
          })
    }


    const patchTask = async () => {
        await fetch("/api/tasks/" + taskId, {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  task: editModalValue
              })
          })
          .then(res => res.json())
          .then(result => {
            const arrayObject = tasksArray.findIndex(task => task._id === result.tasks._id)
            tasksArray.splice(arrayObject, 1, result.tasks);
            tasksArray = [...tasksArray]
            showModal = false;
          })
    }

    
    const deleteTask = async (e) => {
        e.preventDefault();
        let id = e.target.parentElement.parentElement.id
        console.log(id)
        await fetch("/api/tasks/" + id, {
            method: "DELETE",
        })
        tasksArray = tasksArray.filter(task => task._id != id)
    };

</script>

<h1>Tasks</h1>
<div class="container-textarea">
    <form on:submit|preventDefault={postTask}>
        <h3>Write your task to property manager here</h3>
        <textarea bind:value={taskText} name="tasktextarea" class="textarea-add-task" cols="60" rows="5" />
        <br />
        <button type="submit">Add task</button>
    </form>
</div>
<br />

{#each tasksArray as task}
    <div class="container" id="{task._id}">
        <div ><p>Writer: {task.writer} <br /> Date: {task.date}</p></div>
        <div>
            <textarea name="" class="textarea-task" cols="40" rows="5" readonly>
Task:
{task.task}</textarea>
        </div>
        {#if name == task.writer}
        <div>
            <p>Options:</p>
            <button on:click={openModal} id="edit-modal">edit</button>
            <button on:click={deleteTask} id="delete-button">Delete task</button>
        </div>
        {:else}
            <div></div>
        {/if}
    </div>
{/each}

{#if showModal}
    <Modal>
        <form on:submit|preventDefault={patchTask}>
            <h3>Edit task</h3>
            <textarea name="task" class="textarea-add-task" cols="60" rows="5" bind:value={editModalValue}></textarea>
            <button type="submit">Edit task</button>
        </form>
        <button on:click={closeModal}>Close</button>
    </Modal>
{/if}

<style>
    h3 {
        color: #56baed;
    }

    .container-textarea {
        display: grid;
        text-align: center;
    }

    .container {
        display: flex;
        margin-left: 10%;
        margin-right: 10%;
        margin-bottom: 5px;
        border: 2px outset ;
    }

    .container > div {
        flex: 1;
        align-content: center;
        border: 1px;
        padding: 5px;
    }

    .textarea-add-task {
        background-color: aliceblue;
    }

    .textarea-task{
        background-color: aliceblue;
    }

    button {
        background-color: #56baed;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        text-transform: uppercase;
        font-size: 13px;
        -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
        box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
        -webkit-border-radius: 5px 5px 5px 5px;
        border-radius: 5px 5px 5px 5px;
        margin: 5px;
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
