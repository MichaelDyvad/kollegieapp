<script>
      const room = window.location.pathname.split("/").pop();
      
      let residentArray = [];
      fetch("/api/residents/" + room)
            .then((res) => res.json())
            .then((result) => {
                  residentArray = result[0].resident;
            });   
      let assortmentArray = [];
      fetch("/api/assortment")
            .then((res) => res.json())
            .then((result) => {
                  assortmentArray = result[0].assortment;
            });   
      const patchResident = async (e) => {
            let price = e.target.querySelector(".child").id;
            await fetch("/api/residents/" + room, {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                        price: price,
                  }),
            })
                  .then((res) => res.json())
                  .then((result) => {
                        residentArray = [result.resident];
                        toastr.success("Bill incrementet with:" + price)
                  });
      };
</script>

<br />
<a href="/">Go back</a>
{#each residentArray as resident}
      <h1>{resident.room} : {resident.name}</h1>
      <h1>Bill: {resident.bill}kr</h1>
{/each}
<div class="container">
      {#each assortmentArray as assortment}
            <div class="assortment">
                  <form on:submit|preventDefault={patchResident}>
                        <button class="child"  type="submit" id={assortment.price} name="option{assortment.option}">{assortment.type} {assortment.price}kr</button>
                  </form>
            </div>
      {/each}
</div>

<style>
      .container {
            display: grid;
            text-align: center;
            gap: 30px 40px;
            grid-template-areas:
                  "."
                  "."
                  "."
                  "."
                  "."
                  "."
                  ".";
      }

      button {
            background-color: #56baed;
            width: 40%;
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
            -webkit-transition: all 0.3s ease-in-out;
            -moz-transition: all 0.3s ease-in-out;
            -ms-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
      }

      a {
            background-color: #56baed;
            width: 10%;
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
            -webkit-transition: all 0.3s ease-in-out;
            -moz-transition: all 0.3s ease-in-out;
            -ms-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
      }
      h1 {
            text-align: center;
      }
</style>
