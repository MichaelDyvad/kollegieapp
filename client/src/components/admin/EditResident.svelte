<script>
    
    let residentsArray = [];
    fetch("/api/residents")
        .then((res) => res.json())
        .then((result) => {
            residentsArray = result[0].residents;
            console
        });
    
    
    let selected;
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
          }).then(res => res.json())
          .then(result => {
            const arrayObject = residentsArray.findIndex(resident => resident.id === result.resident._id)
            console.log(arrayObject)
            residentsArray.splice(arrayObject, 1, result.resident);
            residentsArray = [...residentsArray]
          })
          toastr.success(selected.room + " edited")
    }

    let selectedDelete;
    const deleteResident = async () => {
        await fetch("/editresident/" + selectedDelete.room, {
            method: "DELETE"
        })
        residentsArray = residentsArray.filter(resident => resident.room != selectedDelete.room)
        toastr.success(selectedDelete.room + " deleted")
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

<style>
    input, select{
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 20%;
  border: 2px solid #f6f6f6;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}
button{
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px;
  transition: all 0.3s ease-in-out;
}
</style>