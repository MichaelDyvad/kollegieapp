<script>
  let assortmentArray = [];
  fetch("/api/assortment")
    .then((res) => res.json())
    .then((result) => {
      assortmentArray = result[0].assortment;
    });


  let postType;
  let postPrice;
  const postAssortment = async () => {
    await fetch("/api/editassortment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: postType,
        price: postPrice,
      }),
    })
      .then((res) => res.json())
      .then((result) => {assortmentArray = [...assortmentArray, result.assortment];});
    toastr.success(postType + " added to assortment");
    postType = "";
    postPrice = "";
  };


  let selected;
  let type;
  let price;
  const patchAssortment = async () => {
    await fetch("/api/editassortment/" + selected._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const arrayObject = assortmentArray.findIndex(
        (assortment) => assortment._id === result.assortment._id);
        assortmentArray.splice(arrayObject, 1, result.assortment);
        assortmentArray = [...assortmentArray];
      });
    toastr.success(selected.type + " edited");
  };


  let selectedDelete;
  const deleteAssortment = async () => {
    await fetch("/api/editassortment/" + selectedDelete._id, {
      method: "DELETE",
    });
    assortmentArray = assortmentArray.filter((assortment) => assortment._id != selectedDelete._id);
    toastr.success(selectedDelete.type + " deleted");
  };
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
<form on:submit|preventDefault={postAssortment}>
  <input name="addassortmenttype" type="text" placeholder="Enter new type" bind:value={postType} required>
  <input name="addassortmentprice" type="text" placeholder="Enter new price" bind:value={postPrice} required>
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