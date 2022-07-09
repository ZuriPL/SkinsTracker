<script>
    import { user } from '$lib/user'
    import { goto } from '$app/navigation'
    import toast from '$lib/toast.js'
    let password

    async function handleDelete() {
        if (!password) return
        
        let res = await fetch('/api/delete-account', {
            method: 'POST',
            body: JSON.stringify({
                password: password
            })
        })
        console.log(1)
        let text = await res.json()
        console.log(2)
        if (text.error != undefined) {
            return toast({text: text.error})
        }
        toast.pop(0)
        await fetch('/api/logout')
        goto('/signup')
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
        background-color: hsl(0, 83%, 55%);
        color: white;
        border-radius: 0.5rem;
        margin-top: 1rem;
    }
    button:hover {
        background-color: hsl(0, 70%, 50%);
    }
    input.disabled {
        background-color: hsl(0, 0%, 90%);
        color: hsl(0, 0%, 40%)
        }
</style>



<div class="center main">

    <h2>Delete account</h2>
    
    <form class="form-container">
        <p>Are you sure you want to delete your account?</p>
        <p><strong>Note: </strong>This action cannot be undone.</p>
        <br>
        <label for="email">Email:</label>
        <input value={$user.email} type="email" id="email" class="disabled" />
        <label for="pass">Confirm password:</label>
        <input bind:value={password} autocomplete="current-password" type="password" id="pass" />

        <button on:click|preventDefault="{handleDelete}">Confirm</button>
    </form>
</div>
