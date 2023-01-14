<script>
  import { toast } from "@zerodevx/svelte-toast";

  let name = "";
  fetch("/api/user")
    .then((res) => res.json())
    .then((result) => {
      name = result.name;
    });

  
  let currentImage = 0;

  function prevImage() {
    currentImage = currentImage > 0 ? currentImage - 1 : images.length - 1;
  }

  function nextImage() {
    currentImage = currentImage < images.length - 1 ? currentImage + 1 : 0;
  }

  let images = [
    "https://scontent-cph2-1.xx.fbcdn.net/v/t39.30808-6/309063876_3331678337062463_2001689488511877288_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a83260&_nc_ohc=NM3gAVXBTPYAX_Rj0MQ&_nc_ht=scontent-cph2-1.xx&oh=00_AfBBjvJcuivZXTprb7XUOcJ_KAo8u61i40KFT1dxfVJi6A&oe=63C88EAA",
    "https://scontent-cph2-1.xx.fbcdn.net/v/t39.30808-6/308680085_3331678110395819_1376925611990512935_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a83260&_nc_ohc=IxdBRmLgpWEAX9ec0th&_nc_ht=scontent-cph2-1.xx&oh=00_AfAe9FtFbZ0aVgl17P4Pb1UmJDm9dtCAMbLXAF5P1JEheQ&oe=63C794A9",
    'image3.jpg'
  ];
</script>

<h1>Home</h1>


<div class="slider-container">
  
  <img src={images[currentImage]} alt="Slider Image" class="slider-image" />
  <button on:click={prevImage}>Previous</button>
  <button on:click={nextImage}>Next</button>
</div>

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
  .slider-container {
  margin: auto;
  padding: 10px;
  width: 70%;
  text-align: center;
}

.slider-image {
  max-width: 100%;
}

button{
  background-color: #56baed;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px;
  transition: all 0.3s ease-in-out;
}
</style>