<script>
    let assortmentArray = [];
      fetch("http://localhost:8080/api/assortment")
      .then(res => res.json())
      .then(result => {
            assortmentArray = result[0].assortment
      })
</script>

<h1>Edit assortment</h1>
<form action="/editassortment" method="POST">
  <select name="assortmentoption">
    {#each assortmentArray as assortment}
      <option value="{assortment.type}">{assortment.type}</option>
    {/each}
    </select>
  <input name="editassortmenttype" type="text" placeholder="Enter new type">
  <input name="editassortmentprice" type="text" placeholder="Enter new price">
  <button type="submit">Edit assortment</button>
</form>

<h1>Add new assortment</h1>
<form action="/editassortment" method="POST">
  <input name="addassortmenttype" type="text" placeholder="Enter new type">
  <input name="addassortmentprice" type="text" placeholder="Enter new price">
  <button type="submit">Add to assortment</button>
</form>

<h1>Delete assortment</h1>
<form action="">
  
</form>