<script>
    import { user } from '$lib/user'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
    import SegmentedInput from 'svelte-segmented-input';
    import toast from '$lib/toast.js'

    let code
    let password
    let confirmPassword

    onMount(() => fetch('/api/generate-code'))

    async function handleSubmit() {
        let res = await fetch('/api/recover-password', {
            method: 'POST',
            body: JSON.stringify({
                code,
                password,
            })
        })
        let data = await res.json()
        if (data.error != undefined) {
            return toast({text: data.error})
        }
        toast.pop(0)
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
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
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
    button {
        all: unset;
        padding: 0.5rem 1rem;
        background-color: var(--accent-color);
        color: white;
        border-radius: 0.5rem;
        margin-top: 0.5rem;
    }
    button:hover {
        background-color: var(--accent-darker);
    }
    button[disabled] {
        background-color: var(--border-color) !important;
        color: hsl(0, 0%, 40%) !important;
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
</style>



<main>

    <h2>Recover password</h2>
    
    <form class="form-container">
        <p>We sent an email with a recovery link to <strong>{$user.email}</strong></p>
        <br>
    
        <label for="first-input">Code:</label>
        <SegmentedInput length="{6}" bind:value="{code}" />
        <br>

        <label for="pass">New password:</label>
        <input bind:value={password} autocomplete="new-password" type="password" id="pass" />
        <label for="pass-new">Confirm password:</label>
        <input bind:value={confirmPassword} autocomplete="new-password" type="password" id="pass-new" />
        
        {#if code == 'typing' || !password || password != confirmPassword}
            <button disabled>Confirm</button>
        {:else}
            <button on:click|preventDefault="{handleSubmit}">Confirm</button>
        {/if}
    </form>
</main>

