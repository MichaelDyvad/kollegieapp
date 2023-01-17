<script>
    import { Router, Route, Link } from "svelte-navigator";
    import Navbar from "./components/navbar/Navbar.svelte"
    import Footer from "./components/footer/Footer.svelte";
    import Index from "./components/index/Index.svelte";
    import Login from "./components/login/Login.svelte";
    import Signup from "./components/login/Signup.svelte"
    import Home from "./components/home/Home.svelte"
    import Admin from "./components/admin/Admin.svelte";
    import AdminNavbar from "./components/navbar/AdminNavbar.svelte";
    import Residents from "./components/residents/Residents.svelte";
    import EditAssortment from "./components/admin/EditAssortment.svelte";
    import EditResident from "./components/admin/EditResident.svelte";
    import Tasks from "./components/tasks/Tasks.svelte";
    import Laundry from "./components/laundry/Laundry.svelte";
    
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

        <Route path="/tasks">
        {#if role === "ADMIN"}
            <AdminNavbar />
            <Tasks />
        {:else}
            <Navbar />
            <Tasks />
        {/if}
        </Route>

        <Route path="laundry">
            {#if role === "ADMIN"}
            <AdminNavbar />
            <Laundry />
        {:else}
            <Navbar />
            <Laundry />
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
            {#if role === "ADMIN"}
            <AdminNavbar />
            <Residents />
            {:else}
            <Navbar />
            <Residents />
            {/if}
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

        <Footer />
    </main>
</Router>