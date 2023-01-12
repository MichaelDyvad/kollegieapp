<script>
  import { toast } from "@zerodevx/svelte-toast";

  let name = "";
  fetch("/api/user")
    .then((res) => res.json())
    .then((result) => {
      name = result.name;
    });  
</script>

<h1>Home</h1>

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
</style>
