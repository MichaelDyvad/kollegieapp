<script>
    import { Router, Route, Link } from "svelte-navigator";
    import Navbar from "./components/navbar/Navbar.svelte"
    import Footer from "./components/footer/Footer.svelte";
    import Index from "./components/index/Index.svelte";
    import Login from "./components/login/Login.svelte";
    import Signup from "./components/login/Signup.svelte"
    import ForgotPassword from "./components/login/ForgotPassword.svelte"
    import Home from "./components/home/Home.svelte"
    import Admin from "./components/admin/Admin.svelte";
    import AdminNavbar from "./components/navbar/AdminNavbar.svelte";
    import Residents from "./components/residents/Residents.svelte";
    import {SvelteToast} from '@zerodevx/svelte-toast'
    import EditAssortment from "./components/admin/EditAssortment.svelte";
    import EditResident from "./components/admin/EditResident.svelte";

    let role = ""
    fetch("/api/isadmin")
    .then(res => res.json())
    .then(result => {
        role = result.role
    });

</script>

<Router>
    
    <main>
        <Route>
        {#if role === "ADMIN"}
            <AdminNavbar />
            <Index />
        {:else}
            <Navbar />
            <Index />
        {/if}
        </Route>

        <Route path="/home">
        {#if role === "ADMIN"}
            <AdminNavbar />
            <Home />
        {:else}
            <Navbar />
            <Home />
        {/if}
        </Route>

        <Route path="/editassortment">
            <AdminNavbar />
            <EditAssortment />
        </Route>

        <Route path="/editresident">
            <AdminNavbar />
            <EditResident />
        </Route>
        
        <Route path="/residents/:room">
            <Navbar />
            <Residents/>
        </Route>

        <Route path="/login">
            <Navbar />
            <Login />
        </Route>

        <Route path="/signup">
            <Navbar />
            <Signup />
        </Route>

        <Route path="/admin">
            <AdminNavbar />
            <Admin />
        </Route>

        <Route path="/forgotpassword">
            <Navbar />
            <ForgotPassword />
        </Route>

        <Footer />
        <SvelteToast />
    </main>
</Router>