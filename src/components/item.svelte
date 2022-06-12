<script>
    export let name;
    export let id;
    export let counter;

    import { user } from '$lib/user.js'

    async function deleteSkin(name, id) {
        await fetch(`/api/setSkin`, {
            method: 'DELETE',
            body: JSON.stringify({
                id, name
            })
        })
        let res = await fetch('/api/getUser')
        let obj = await res.json()
        user.set(obj)
    }
</script>

<style>
    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
    }
    .item:first-child {
        margin-top: 0.25rem;
    }
    .gray {
        background-color: var(--border-color);
    }
    p > span {
        display: inline-block;
        width: 3.5ch;
    }
    button {
        all: unset;
        display: grid;
        place-items: center;
    }
    button path {
        transition: 150ms ease-out;
    }
    button:hover path {
        fill: red !important;
    }
</style>

<div class="item {counter % 2 == 0 ? 'gray' : ''}">
    <p id="{id}"><span>{counter}.</span>{name}</p>
    <button on:click="{() => deleteSkin(name, id)}"><svg style="width:16px;height:16px" viewBox="0 0 24 24">
        <path fill="black" d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
    </svg></button>
</div>