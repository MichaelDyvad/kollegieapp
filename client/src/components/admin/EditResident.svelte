<script>

    let residentsArray = [];

    fetch("http://localhost:8080/api/residents")
        .then((res) => res.json())
        .then((result) => {
            residentsArray = result[0].residents;
            console
        });
    
    let selected;

    const deleteResident = async () => {
        await fetch("/editresident", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        location.reload()
    }
    
</script>

<h1>Edit resident</h1>

<form action="/editresident" method="POST">
<select name="residentselect" bind:value={selected}>
    {#each residentsArray as resident}
        <option value="{resident}">{resident.room} : {resident.name}</option>
    {/each}
</select>
    <input type="text" name="roomnumber" value="{selected ? selected.room : '[waiting...]'}" readonly>
    <input type="text" id="residentname" class="fadeIn second" name="residentname" value="{selected ? selected.name : '[waiting...]'}">
    <input type="email" id="email" class="fadeIn second" name="residentemail" value="{selected ? selected.email : '[waiting...]'}">
    <input type="text" id="password" class="fadeIn third" name="residentpassword" value="123">
    <input type="text" id="bill" class="fadeIn third" name="residentbill" value="{selected ? selected.bill : '[waiting...]'}">
    <select name="residentrole">
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
    </select>
    <button type="submit">Edit resident</button>

<h1>Delete resident</h1>
<form on:submit|preventDefault={deleteResident}>
    <select name="deleteresidentselect" id="">
        {#each residentsArray as resident}
            <option value="{resident._id}">{resident.room} : {resident.name}</option>
        {/each}
    </select>
    <button type="submit">Delete resident</button>
</form>

</form>