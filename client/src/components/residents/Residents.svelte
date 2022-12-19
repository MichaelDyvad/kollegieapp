<script>
      const room = window.location.pathname.split("/").pop();

      let residents = [];
      fetch("http://localhost:8080/api/residents/" + room)
            .then((res) => res.json())
            .then((result) => {
                  residents = result[0].resident;
            });

      let assortmentArray = [];
      fetch("http://localhost:8080/api/assortment")
      .then(res => res.json())
      .then(result => {
            assortmentArray = result[0].assortment
      })

</script>
<br>
<a href="/">Gå tilbage</a>
{#each residents as resident}
<h1>{resident.room}</h1>
<h1>REGNING: {resident.bill}</h1>
{/each}
<div class="container">
      {#each assortmentArray as assortment}
            <div class="assortment">
                  <form action="/residents/{room}" method="POST">
                        <button type="submit" name="option{assortment.option}" value="{assortment.price}">{assortment.type} {assortment.price}kr</button>
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

      a{
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
