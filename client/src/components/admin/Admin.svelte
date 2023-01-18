<script>
      import Modal from "../modal/Modal.svelte";

      let residentsArray = [];
      fetch("/api/residents")
            .then((res) => res.json())
            .then((result) => {
                  residentsArray = result[0].residents;
            });

      let bill = [];
      fetch("/api/bills")
            .then((res) => res.json())
            .then((result) => {
                  bill = result[0].bills;
            });

      let showModal = false;
      function openModal() {
            showModal = true;
      }

      function closeModal() {
            showModal = false;
      }

      const patchBills = async () => {
            await fetch("/api/bills", {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                        bill: 0,
                  }),
            })
                  .then((res) => res.json())
                  .then((result) => {
                        residentsArray = result.bills;
                        bill.summedBills = 0;
                        showModal = false;
                  });
      };
</script>

<h1>Overview</h1>
<h1>Summed bills = {bill.summedBills}kr</h1>

<div class="container">
      {#each residentsArray as resident}
            <div class="residentone">
                  <a href="/admin">{resident.room} : {resident.bill} kr</a>
            </div>
      {/each}
</div>

<h1>Reset bills</h1>
<div class="div-reset">
      <button class="red-button" on:click={openModal}>Reset bills</button>
</div>

{#if showModal}
      <Modal>
            <h1>Do you want to reset all bills?</h1>
            <div class="modal-buttons">
                  <button class="red-button" on:click={patchBills}>Yes</button>
                  <button class="green-button" on:click={closeModal}>No</button>
            </div>
      </Modal>
{/if}

<style>
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
      .container {
            display: grid;
            text-align: center;
            gap: 30px 40px;
            grid-template-areas:
                  ". . . ."
                  ". . . ."
                  ". . . ."
                  ". . . ."
                  ". . . ."
                  ". . . ."
                  ". . . .";
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

      a,
      button {
            background-color: #56baed;
            width: 35%;
            table-layout: fixed;
            border: none;
            color: white;
            padding: 15px 60px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            text-transform: uppercase;
            font-size: 13px;
            -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
            box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
            -webkit-border-radius: 5px 5px 5px 5px;
            transition: all 0.3s ease-in-out;
      }

      h1 {
            text-align: center;
      }

      .div-reset {
            text-align: center;
      }

      .modal-buttons {
            text-align: center;
      }
</style>
