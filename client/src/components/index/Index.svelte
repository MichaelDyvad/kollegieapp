<script>

      let residentsArray = []

      fetch("http://localhost:8080/api/residents")
      .then((res) => res.json())
      .then((result) => {
            //residentsArray.push(result[0].residents)
            result[0].residents.forEach(resident => {
                  residentsArray.push({name: resident.name, bill: resident.bill})
            })
      })
      console.log(residentsArray)
</script>

<h1>Welcome to my page</h1>
<h1>From here you can navigate through the navbar</h1>


<style>

h1{
      text-align: center;
}
</style>