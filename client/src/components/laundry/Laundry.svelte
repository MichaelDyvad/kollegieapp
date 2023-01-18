<script>
  import io from "socket.io-client";

  import Modal from "../modal/Modal.svelte";

  let laundryArray = [];
  fetch("/api/laundry")
    .then((res) => res.json())
    .then((result) => {
      laundryArray = result[0].laundry;
    });

  let role = "";
  fetch("/api/isadmin")
    .then((res) => res.json())
    .then((result) => {
      role = result.role;
    });

  let socket = io();
  let activeUsers = 0;
  socket.on("users-connected", (data) => {
            activeUsers = data.message;
      });

      socket.on("disconnect", () => {
            activeUsers--;
      });

  let showModal = false;
  let showModalReset = false;
  let laundryId;
  function openModal(e) {
    e.preventDefault();
    laundryId = e.target.parentElement.id;
    if(activeUsers > 2){
      showModal = false
    }else{
      showModal = true;
    }
  }

  function openModalReset() {
    showModalReset = true;
  }

  function closeModal() {
    showModal = false;
    showModalReset = false;
  }

  let editRoomValue;
  const patchLaundry = async () => {
    await fetch("/api/laundry/" + laundryId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room: editRoomValue,
      }),
    }).then(res => res.json())
    .then(result => {
      const arrayObject = laundryArray.findIndex(laundry => laundry._id === result.laundry._id)
      laundryArray.splice(arrayObject, 1, result.laundry);
      laundryArray = [...laundryArray]
      showModal = false;
    })
  };

  const patchResetLaundry = async () => {
    await fetch("/api/laundry", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room: "",
      }),
    })
    .then(res => res.json())
    .then(result => {
      laundryArray = result.laundry
      showModalReset = false;
      toastr.error("Laundry scheme resat")
    })
  };
</script>
<br>
<h1>Laundry scheme</h1>
<h1>Users active {activeUsers}</h1>
<form>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <label for="time">Time</label>
        <div>
          <input type="text" id="time" name="" value="08:00" readonly />
          <input type="text" id="" name="" value="09:00" readonly />
          <input type="text" id="" name="" value="10:00" readonly />
          <input type="text" id="" name="" value="11:00" readonly />
          <input type="text" id="" name="" value="12:00" readonly />
          <input type="text" id="" name="" value="13:00" readonly />
          <input type="text" id="" name="" value="14:00" readonly />
          <input type="text" id="" name="" value="15:00" readonly />
          <input type="text" id="" name="" value="16:00" readonly />
          <input type="text" id="" name="" value="17:00" readonly />
        </div>
      </div>

      <div class="col-sm">
        <label for="monday">Monday</label>
        {#each laundryArray as laundry}
          <div class="laundry-div" id={laundry._id}>
            {#if laundry.day == "monday"}
              <button class="main-button" on:click={openModal} id="monday">{laundry.room}</button>
            {/if}
          </div>
        {/each}
      </div>

      <div class="col-sm">
        <label for="tuesday">Tuesday</label>
        {#each laundryArray as laundry}
          <div class="laundry-div" id={laundry._id}>
            {#if laundry.day == "tuesday"}
              <button class="main-button" on:click={openModal} id="tuesday">{laundry.room}</button>
            {/if}
          </div>
        {/each}
      </div>

      <div class="col-sm">
        <label for="wednesday">Wednesday</label>
        {#each laundryArray as laundry}
          <div class="laundry-div" id={laundry._id}>
            {#if laundry.day == "wednesday"}
              <button class="main-button" on:click={openModal} id="wednesday">{laundry.room}</button
              >
            {/if}
          </div>
        {/each}
      </div>

      <div class="col-sm">
        <label for="thursday">Thursday</label>
        {#each laundryArray as laundry}
          <div class="laundry-div" id={laundry._id}>
            {#if laundry.day == "thursday"}
              <button class="main-button" on:click={openModal} id="thursday">{laundry.room}</button>
            {/if}
          </div>
        {/each}
      </div>

      <div class="col-sm">
        <label for="friday">Friday</label>
        {#each laundryArray as laundry}
          <div class="laundry-div" id={laundry._id}>
            {#if laundry.day == "friday"}
              <button class="main-button" on:click={openModal} id="friday">{laundry.room}</button>
            {/if}
          </div>
        {/each}
      </div>

      <div class="col-sm">
        <label for="saturday">Saturday</label>
        {#each laundryArray as laundry}
          <div class="laundry-div" id={laundry._id}>
            {#if laundry.day == "saturday"}
              <button class="main-button" on:click={openModal} id="saturday">{laundry.room}</button>
            {/if}
          </div>
        {/each}
      </div>

      <div class="col-sm">
        <label for="sunday">Sunday</label>
        {#each laundryArray as laundry}
          <div class="laundry-div" id={laundry._id}>
            {#if laundry.day == "sunday"}
              <button class="main-button" on:click={openModal} id="sunday">{laundry.room}</button>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</form>

{#if showModal}
  <Modal>
    <form on:submit|preventDefault={patchLaundry}>
      <h3>Add room to laundry time</h3>

      <div class="input-div">
        <input id="input-modal" name="room" class="room-value" bind:value={editRoomValue} />
      </div>

      <br />

      <div class="modal-buttons">
        <button class="green-button" type="submit">Add</button>
        <button on:click={closeModal}>Close</button>
      </div>

    </form>
  </Modal>
{/if}


{#if role === "ADMIN"}
  <h1>Reset here</h1>
  <div class="reset-div">
    <button class="red-button" on:click={openModalReset}>Reset laundry</button>
  </div>
{/if}

{#if showModalReset}
  <Modal>
    <h3>Do you want to reset the laundry scheme?</h3>
    <div class="modal-buttons">
      <button class="red-button" on:click={patchResetLaundry}>Yes</button>
      <button class="green-button" on:click={closeModal}>No</button>
    </div>
  </Modal>
{/if}

<style>
  .container {
    width: 100%;
  }
  .row {
    display: flex;
  }
  .laundry-div{
    margin-left: 1px;
    margin-right: 1px;
  }
  .col-sm {
    flex: 1;
    text-align: center;
    border-color: aqua;
  }
  label {
    font-weight: bold;
  }
  input {
    width: 8em;
    height: 3em;
    padding: 12px 20px;
    margin: 2px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    text-align: center;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
  .main-button {
    width: 8em;
    height: 3em;
    margin: 2px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    text-align: center;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
  .green-button {
            background-color: green;
            border: none;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            text-transform: uppercase;
            font-size: 13px;
            -webkit-box-shadow: 0 10px 30px 0 rgba(20, 173, 59, 0.4);
            box-shadow: 0 10px 30px 0 rgba(20, 173, 59, 0.4);
            -webkit-border-radius: 5px 5px 5px 5px;
            border-radius: 5px 5px 5px 5px;
            margin: 5px;
            transition: all 0.3s ease-in-out;
      }
  .red-button {
            background-color: rgb(207, 23, 23);
            border: none;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            text-transform: uppercase;
            font-size: 13px;
            -webkit-box-shadow: 0 10px 30px 0 rgba(238, 11, 11, 0.4);
            box-shadow: 0 10px 30px 0 rgba(238, 11, 11, 0.4);
            -webkit-border-radius: 5px 5px 5px 5px;
            border-radius: 5px 5px 5px 5px;
            margin: 5px;
            transition: all 0.3s ease-in-out;
      }
  .input-div{
    text-align: center;
  }
  label {
    color: antiquewhite;
  }
  .reset-div {
    text-align: center;
  }
  h3 {
    color: #56baed;
  }
  h1{
    text-align: center;
  }
  .modal-buttons {
    text-align: center;
  }
</style>