<script>

    const urlParams = new URLSearchParams(window.location.search)
    const roomNumber = urlParams.has()

    let residentsArray = []

    fetch("http://localhost:8080/api/residents/" + roomNumber)
    .then((res) => res.json())
    .then((result) => {
          residentsArray = result[0].residents
          console.log(residentsArray)
    })

</script>
{#each residentsArray as resident}
      <div class="residentone" ><a href="/residents/{resident.room}">{resident.name} {resident.room}</a></div>
{/each}