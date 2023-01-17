<script>
      let residentsArray = [];
      export let title;

      fetch("/api/residents")
            .then((res) => res.json())
            .then((result) => {
                  residentsArray = result[0].residents;
            });
</script>
<h1>{title}</h1>
<div class="container">
      {#each residentsArray as resident}
            <div class="residentone">
                  <a href="/residents/{resident.room}">{resident.room}</a>
            </div>
      {/each}
</div>

<style>
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

      a {
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
            -o-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
      }

      h1 {
            text-align: center;
      }
</style>