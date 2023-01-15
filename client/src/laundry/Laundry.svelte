<script>
  import Modal from "../components/modal/Modal.svelte"

  let laundryArray = []
  fetch("/api/laundry")
  .then(res => res.json())
  .then(result => {
    laundryArray = result[0].laundry
  })

  let role = ""
    fetch("/api/isadmin")
    .then(res => res.json())
    .then(result => {
        role = result.role
    });

  let showModal = false;
  let showModalReset = false;
  let editRoomValue;
  let laundryId
  function openModal(e){
    e.preventDefault();
    laundryId = e.target.parentElement.id
    console.log(laundryId)
    showModal = true;
  }

  function openModalReset(e) {
            showModalReset = true;
      }

  function closeModal() {
        showModal = false;
    }

  const patchLaundry = async () => {
          await fetch("/api/laundry/" + laundryId, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    room: editRoomValue
                })
            })
            toastr.success("it works")
            setTimeout(()=> {
              location.reload()
            },1300)
      }
  
  const patchResetLaundry = async () => {
        await fetch("/api/laundry", {
              method: "PATCH",
              headers: {
                    "Content-Type": "application/json",
              },
              body: JSON.stringify({
                    room: "",
              }),
        });
        location.reload();
  };
</script>

{#if role === "ADMIN"}
<div class="reset-div">
<button on:click={openModalReset}>Reset laundry scheme</button>
</div>
{/if}

<br>

{#if showModalReset}
  <Modal>
      <h3>Do you want to reset the laundry scheme?</h3>
          <div class="modal-buttons">
                <button class="red-button" on:click={patchResetLaundry}>Yes</button>
                <button class="green-button" on:click={closeModal}>No</button>
          </div>
  </Modal>
{/if}

<form>
    <div class="container">
      <div class="row">
        <div class="col-sm">
            <label for="time">Time</label>
            <div>
            <input type="text" id="time" name="" value="08:00" readonly>
            <input type="text" id="" name="" value="09:00" readonly>
            <input type="text" id="" name="" value="10:00" readonly>
            <input type="text" id="" name="" value="11:00" readonly>
            <input type="text" id="" name="" value="12:00" readonly>
            <input type="text" id="" name="" value="13:00" readonly>
            <input type="text" id="" name="" value="14:00" readonly>
            <input type="text" id="" name="" value="15:00" readonly>
            <input type="text" id="" name="" value="16:00" readonly>
            <input type="text" id="" name="" value="17:00" readonly>
          </div>
          </div>
          
        <div class="col-sm">
            <label for="monday">Monday</label>
            {#each laundryArray as laundry}
          <div id="{laundry._id}">
            {#if laundry.day == "monday"}
            <button on:click={openModal} id="monday">{laundry.room}</button>
            {/if}
          </div>
          {/each}
        </div>
        
        <div class="col-sm">
          <label for="tuesday">Tuesday</label>
            {#each laundryArray as laundry}
            <div id="{laundry._id}">
            {#if laundry.day == "tuesday"}
            <button on:click={openModal} id="tuesday">{laundry.room}</button>
            {/if}
            </div>
            {/each}
        </div>

        <div class="col-sm">
          <label for="wednesday">Wednesday</label>
            {#each laundryArray as laundry}
            <div id="{laundry._id}">
            {#if laundry.day == "wednesday"}
            <button on:click={openModal} id="wednesday">{laundry.room}</button>
            {/if}
            </div>
            {/each}
        </div>

        <div class="col-sm">
          <label for="thursday">Thursday</label>
            {#each laundryArray as laundry}
            <div id="{laundry._id}">
            {#if laundry.day == "thursday"}
            <button on:click={openModal} id="thursday">{laundry.room}</button>  
            {/if}
            </div>
            {/each}
        </div>

        <div class="col-sm">
          <label for="friday">Friday</label>
            {#each laundryArray as laundry}
            <div id="{laundry._id}">
            {#if laundry.day == "friday"}
            <button on:click={openModal} id="friday">{laundry.room}</button>   
            {/if}
            </div>
            {/each}
        </div>

        <div class="col-sm">
          <label for="saturday">Saturday</label>
            {#each laundryArray as laundry}
            <div id="{laundry._id}">
            {#if laundry.day == "saturday"}
            <button on:click={openModal} id="saturday">{laundry.room}</button>'
            {/if}
            </div>
            {/each}
        </div>

        <div class="col-sm">
          <label for="sunday">Sunday</label>
            {#each laundryArray as laundry}
            <div id="{laundry._id}">
            {#if laundry.day == "sunday"}
            <button on:click={openModal} id="sunday">{laundry.room}</button>
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
            <input name="room" class="room-value" bind:value={editRoomValue}>
            <button type="submit">Add laundry time</button>
        </form>
        <button on:click={closeModal}>Close</button>
    </Modal>
  {/if}


<style>
    .container {
  width: 100%;
}

.row {
  display: flex;
}

.col-sm {
  flex: 1;
  text-align: center;
}

label {
  font-weight: bold;
}

input{
  width: 8em;  height: 3em;
  padding: 12px 20px;
  margin: 2px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  text-align: center;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

button{
  width: 8em;  height: 3em;
  margin: 2px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  text-align: center;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

label{
    color: antiquewhite;
}

.reset-div{
  text-align: center;
}
</style>

