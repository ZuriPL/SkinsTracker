<script>
    import { user } from '$lib/user'
    import { goto } from '$app/navigation'
    import toast from '$lib/toast.js'
    let code

    async function handleChange() {
        if (!password || !oldPassword || password != confirmPassword) return
        
        let res = await fetch('/api/change-password', {
            method: 'POST',
            body: JSON.stringify({
                oldPassword,
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

    function handleInput(e) {
        e.preventDefault()
        if (Number.isNaN(+e.key) || e.target.value.length >= 6) return
        e.target.value += e.key
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
        font-size: 2rem;
        border-radius: 0.4rem;
        border: 2px solid var(--border-color);
        outline: none;
        padding: 0.25rem;
        box-sizing: content-box;
        width: 6ch;
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
    .link {
        color: var(--link-color);
        margin-top: 0.75rem;
        font-size: 0.85rem;
        text-underline-offset: 1px;
    }
    .link:hover {
        color: #175dcf;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }
</style>



<div class="center main">

    <h2>Change password</h2>
    
    <form class="form-container">
        <p>We sent an email with a recovery link to <strong>{$user.email}</strong></p>
        <br>
        
        <label for="pass-new">Code:</label>
        <input bind:value={code} on:keypress="{handleInput}" autocomplete="off" type="number" id="code" />

        <button on:click|preventDefault="{handleChange}">Confirm</button>
    </form>

    <a href="/forgot-password" class="link">Forgot your password?</a>
</div>
