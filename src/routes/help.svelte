<style>
    h2 {
        font-size: 4rem;
        margin-bottom: 2rem;
    }
    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    main {
        margin-top: 4rem;
        margin-bottom: 1rem;
    }
    .slots-grid {
        border: 2px solid var(--border-color);
        border-radius: 1rem;
        max-width: 80ch;
        width: 90%;
        position: relative;
        overflow: hidden;
        padding: 1rem;
    }
    a {
        color: var(--link-color);
    }
    form {
        width: 100%;
    }
    p {
        margin-bottom: 2.5rem;
        font-size: 1.125rem;
    }
    input, textarea {
        width: 100%;
        display: block;
        margin-bottom: 0.5rem;
        border-radius: 0.5rem;
        outline: none;
        border: 2px solid var(--border-color);
        padding: 0.5rem;
        font-size: 1em;
        font-weight: bold;
    }
    input:focus, textarea:focus {
        border-color: var(--accent-color);
    }
    textarea {
        resize: none;
        font-weight: 500;
    }
    button {
        padding: 0.5rem 1rem;
        border: none;
        background-color: var(--accent-color);
        color: white; /* ! */
        border-radius: 0.5rem;
        display: grid;
        place-items: center;
        font-size: 1em;
    }
    button:hover {
        background-color: var(--accent-darker);
    }
</style>

<main class="center">
    <h2>Help</h2>

    <div class="slots-grid">
        <p>
            If you encounter a bug, have a feature request or something else, please <a href="https://github.com/ZuriPL/SkinsTracker-site/issues/new" target="_blank">open an issue</a> on GitHub. Alternatively you can send an email directly to <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRwRCcThKBbdBJmhWqmDQgQSWcVxfvtFLSDjwXhqfDDcQRwrFpNXhMxkqwpkHQcWtwdplxWR" target="_blank">skinstracker@gmail.com</a> or using the form below.
        </p>
        <form autocomplete="off" name="help" on:submit|preventDefault="{handleForm}">
            <input bind:value="{title}" placeholder="Title" type="text" name="title" id="title">
            <textarea bind:value="{content}" placeholder="Content" name="content" id="content" rows="10"></textarea>
            <button type="submit">Send</button>
        </form>
    </div>
</main>

<script>
    import { user } from '$lib/user'
    import toast from '$lib/toast'

    let title
    let content 

    function handleForm() {
        let data = {
            title,
            content,
            email: $user.email
        }
        console.log(data)
        toast({ text: 'Succesfully submitted an issue', type: 'info' })
    }
</script>