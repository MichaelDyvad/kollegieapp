<script>
    
    let residentsArray = [];
    
    fetch("http://localhost:8080/api/residents")
        .then((res) => res.json())
        .then((result) => {
            residentsArray = result[0].residents;
            console
        });
    
    let selected;
    let selectedDelete;
    const deleteResident = async () => {
        await fetch("/editresident/" + selectedDelete.room, {
            method: "DELETE"
        })
        location.reload()
    }
    
    let selectedRole;
    let name;
    let email;
    let password;
    let bill;
    const patchResident = async () => {
          await fetch("/editresident/" + selected.room, {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  name: name,
                  email: email,
                  password: password,
                  bill: bill,
                  role: selectedRole
              })
          })
          location.reload()
      }

</script>

<h1>Edit resident</h1>
<form on:submit|preventDefault={patchResident}>
<select name="residentselect" bind:value={selected}>
    {#each residentsArray as resident}
        <option value="{resident}">{resident.room} : {resident.name}</option>
    {/each}
</select>
    <input bind:value={name} type="text" id="name" class="fadeIn second" name="name" placeholder="name: {selected ? selected.name : '[waiting...]'}">
    <input bind:value={email} type="email" id="email" class="fadeIn second" name="email" placeholder="email: {selected ? selected.email : '[waiting...]'}">
    <input bind:value={password} type="text" id="password" class="fadeIn third" name="password" placeholder="password">
    <input bind:value={bill} type="text" id="bill" class="fadeIn third" name="bill" placeholder="bill: {selected ? selected.bill : '[waiting...]'}">
    <select name="role" bind:value={selectedRole}>
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
    </select>
    <button type="submit">Edit resident</button>
</form>


<h1>Delete resident</h1>
<form on:submit|preventDefault={deleteResident}>
    <select name="deleteresidentselect" bind:value={selectedDelete}>
        {#each residentsArray as resident}
            <option value="{resident}">{resident.room} : {resident.name}</option>
        {/each}
    </select>
    <button type="submit">Delete resident</button>
</form>