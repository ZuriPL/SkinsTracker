<script>
    import { user } from '$lib/user'
    import { goto } from '$app/navigation'
    import toast from '$lib/toast.js'
    let oldPassword
    let password
    let confirmPassword

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
    .link {
        color: var(--link-color);
        margin-top: 0.75rem;
        font-size: 0.85rem;
        text-underline-offset: 1px;
    }
    .link:hover {
        color: #175dcf;
    }
</style>



<div class="center main">

    <h2>Change password</h2>
    
    <form class="form-container">
        <p>Are you sure you want to change your password?</p>
        <br>
        <label for="email-old">Email:</label>
        <input value={$user?.email} type="email" id="email-old" class="disabled" disabled/>
        <label for="pass-old">Old password:</label>
        <input bind:value={oldPassword} type="password" id="pass-old" autocomplete="current-password"/>
        <label for="pass">New password:</label>
        <input bind:value={password} autocomplete="new-password" type="password" id="pass" />
        <label for="pass-new">Confirm password:</label>
        <input bind:value={confirmPassword} autocomplete="new-password" type="password" id="pass-new" />

        <button on:click|preventDefault="{handleChange}">Confirm</button>
    </form>

    <a href="/forgot-password" class="link">Forgot your password?</a>
</div>
