<script>
    import Modal from "../modal/Modal.svelte";

    let showModal = false;

    function openModal(e) {
        e.preventDefault();
        let id = e.target.parentElement.parentElement.parentElement.id
        

        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    let name = "";
    fetch("/api/user")
        .then((res) => res.json())
        .then((result) => {
            name = result.name;
    });

    let tasks = [];
    fetch("/api/tasks")
        .then((res) => res.json())
        .then((result) => {
            tasks = result[0].tasks;
            console.log(tasks);
        });
    
    const deleteTask = async (e) => {
        e.preventDefault();
        let id = e.target.parentElement.parentElement.id
        console.log(id)
        await fetch("/tasks/" + id, {
            method: "DELETE",
        })
        location.reload()
    };

    

</script>

<h1>Tasks</h1>
<div class="container-textarea">
    <form action="/tasks" method="POST">
        <h3>Write your task to property manager here</h3>
        <textarea name="tasktextarea" class="textarea-add-task" cols="60" rows="5" />
        <br />
        <button type="submit">Add task</button>
    </form>
</div>
<br />

{#each tasks as task}
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
            <p>Options:</p>
        {/if}
    </div>
{/each}

{#if showModal}
    <Modal>
        <form action="/tasks" method="POST">
            <h3>Edit task</h3>
            <textarea name="tasktextarea" class="textarea-add-task" cols="60" rows="5"></textarea>
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
