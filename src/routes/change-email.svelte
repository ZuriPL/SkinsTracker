<script>
    import { user } from '$lib/user'
    import { goto } from '$app/navigation'
    import toast from '$lib/toast.js'
    let email
    let password

    async function handleChange() {
        if (!password || !email) return
        
        let res = await fetch('/api/change-email', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        })
        let data = await res.json()
        if (data.error != undefined) {
            return toast({text: data.error})
        }
        toast.pop(0)
        user.set(data.user)
        goto('/')
    }
</script>


<style>
    :root {
        --toastContainerTop: auto;
        --toastContainerRight: auto;
        --toastContainerBottom: 1.5rem;
        --toastContainerLeft: 2rem;
    }
    h2 {
        font-size: 4rem;
        margin-bottom: 3rem;
        font-family: 'Roboto', sans-serif;
    }
    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .main {
        margin-top: 5rem;
    }
    .form-container {
        border: 2px solid var(--border-color);
        border-radius: 1rem;
        padding: 1rem;
        position: relative;
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        flex-direction: column;
    }
    input {
        width: 100%;
        border-radius: 0.4rem;
        border: 2px solid var(--border-color);
        outline: none;
        padding: 0.25rem;
    }
    input:focus {
        border: 2px solid var(--accent-color);
    }
    button {
        all: unset;
        padding: 0.5rem 1rem;
        background-color: var(--accent-color);
        color: white;
        border-radius: 0.5rem;
        margin-top: 1rem;
    }
    button:hover {
        background-color: var(--accent-darker);
    }
    input.disabled {
        background-color: hsl(0, 0%, 90%);
        color: hsl(0, 0%, 40%)
        }
</style>



<div class="center main">

    <h2>Change email</h2>
    
    <form class="form-container">
        <p>Are you sure you want to change your email?</p>
        <br>
        <label for="email-old">Old email:</label>
        <input value={$user.email} type="email" id="email-old" class="disabled" disabled/>
        <label for="pass">New email:</label>
        <input bind:value={email} type="email" id="email" autocomplete="off"/>
        <label for="pass">Password:</label>
        <input bind:value={password} autocomplete="current-password" type="password" id="pass" />

        <button on:click|preventDefault="{handleChange}">Confirm</button>
    </form>
</div>
