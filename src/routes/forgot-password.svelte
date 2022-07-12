<script>
    import { user } from '$lib/user'
    import { goto } from '$app/navigation'
    import SegmentedInput from '../components/segmentedInput.svelte';
    import toast from '$lib/toast.js'
    let code

    async function handleChange() {
        return
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
    button[disabled] {
        background-color: var(--border-color) !important;
        color: hsl(0, 0%, 40%) !important;
    }
</style>



<div class="center main">

    <h2>Recover password</h2>
    
    <form class="form-container">
        <p>We sent an email with a recovery link to <strong>{$user.email}</strong></p>
        <br>
        
        <label for="first-input">Code:</label>
        <SegmentedInput length="{6}" bind:code="{code}" />

        {#if code == 'typing'}
            <button on:click|preventDefault="{handleChange}" disabled>Confirm</button>
        {:else}
            <button on:click|preventDefault="{handleChange}">Confirm</button>
        {/if}
    </form>
</div>

