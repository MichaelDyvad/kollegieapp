<script>
  let signupName;
  let email;
  let password;
  let room;
  const postSignup = async () => {
    await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signupName,
        email: email,
        password: password,
        room: room,
      }),
    }).then((res) => {
      if (res.status !== 200) {
        toastr.error("Signup failed");
        location.href = "/signup";
      } else if (res.status) {
        setTimeout(() => {
          location.href = "/admin";
        }, 1500);
        toastr.success("Signup succeded, redirecting");
      }
    });
  };
</script>

<h1>Sign-up</h1>
<div class="wrapper fadeInDown">
    <div id="formContent">
      <a href="/login" class="active"> Login / </a>
      <a href="/signup" class="inactive underlineHover">Sign Up </a>
        
      <form on:submit|preventDefault={postSignup}>
        <input type="text" class="fadeIn second" name="name" placeholder="residentname" bind:value={signupName} required>
        <input type="email" class="fadeIn second" name="email" placeholder="email" bind:value={email} required>
        <input type="text" class="fadeIn third" name="password" placeholder="password" bind:value={password} required>
        <input type="text" class="fadeIn third" name="room" placeholder="room" bind:value={room} required>
        <input type="submit" id="signup-btn" class="fadeIn fourth" value="Sign-up">
      </form>
    </div>
</div>

<style>
  a {
    color: #56baed;
    display: inline-block;
    text-decoration: none;
    font-weight: 400;
  }

  .wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 50%;
    padding: 20px;
  }

  #formContent {
    -webkit-border-radius: 10px 10px 10px 10px;
    border-radius: 10px 10px 10px 10px;
    background-color: rgb(59, 59, 59);
    padding: 30px;
    width: 90%;
    max-width: 450px;
    position: relative;
    padding: 0px;
    -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  input[type="submit"] {
    background-color: #56baed;
    border: none;
    color: white;
    padding: 15px 80px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 13px;
    -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    margin: 5px 20px 40px 20px;
    transition: all 0.3s ease-in-out;
  }

  input[type="submit"]:hover {
    background-color: #39ace7;
  }

  input {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    width: 85%;
    border: 2px solid #f6f6f6;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
  }

  input[type="text"]:placeholder {
    color: #cccccc;
  }

  *:focus {
    outline: none;
  }

  * {
    box-sizing: border-box;
  }
</style>