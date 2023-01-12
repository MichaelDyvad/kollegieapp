<script>
    let assortmentArray = [];
      fetch("http://localhost:8080/api/assortment")
      .then(res => res.json())
      .then(result => {
            assortmentArray = result[0].assortment
      })

      let selectedDelete;
      const deleteAssortment = async () => {
        await fetch("/editassortment/" + selectedDelete.type, {
            method: "DELETE"
        })
        location.reload()
    }

      let selected;
      let type;
      let price;

      const patchAssortment = async () => {
          await fetch("/editassortment/" + selected.type, {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  type: type,
                  price: price
              })
          })
          location.reload()
      }
</script>

<h1>Edit assortment</h1>
<form on:submit|preventDefault={patchAssortment}>
  <select name="assortmentoption" bind:value={selected}>
    {#each assortmentArray as assortment}
      <option value="{assortment}">{assortment.type}</option>
    {/each}
    </select>

  <input name="type" type="text" placeholder="type: {selected ? selected.type : '[waiting...]'}" bind:value={type}>
  <input name="price" type="text" placeholder="price: {selected ? selected.price : '[waiting...]'}" bind:value={price}>
  <button type="submit">Edit assortment</button>
</form>

<h1>Add new to assortment</h1>
<form action="/editassortment" method="POST">
  <input name="addassortmenttype" type="text" placeholder="Enter new type" required>
  <input name="addassortmentprice" type="text" placeholder="Enter new price" required>
  <button type="submit">Add to assortment</button>
</form>

<h1>Delete assortment</h1>
<form on:submit|preventDefault={deleteAssortment}>
    <select name="deleteassortmentselect" bind:value={selectedDelete}>
        {#each assortmentArray as assortment}
            <option value="{assortment}">{assortment.type}</option>
        {/each}
    </select>
    <button type="submit">Delete assortment</button>
</form>