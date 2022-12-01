<script>
  import { toast } from "@zerodevx/svelte-toast";

  let name = "";
  fetch("/api/user")
    .then((res) => res.json())
    .then((result) => {
      name = result.name;
    });
</script>

<body>
  <h1 class="center">Ølkøleskab</h1>
</body>

{#if name}
    {toast.push(`Welcome ${name}`, {
      theme: {
        "--toastColor": "mintcream",
        "--toastBackground": "rgba(72,187,120,0.9)",
        "--toastBarBackground": "#2F855A",
      },
    })}
  {/if}

<style>
  p {
    color: whitesmoke;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    text-align: center;
  }

  .boats-div {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 75%;
    text-align: center;
  }

  .img-sizing {
    height: 400px;
  }

</style>
