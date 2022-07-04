<div class="add-popup-bg hide" on:mousedown|self="{handleClose}">
    <div class="add-popup">
        <h2 class="popup-header">New</h2>
        <div id="search-result">
            <input autocomplete="off" type="text" bind:value="{inputValue}" on:input="{handleInput}" on:focus="{handleInput}" on:blur="{handleRemoveList}" id="searchbar"/>
            <div list>
                {#each suggestions as suggestion}
                    <li class="option">
                        <button id="{suggestion.goods_ids}" on:mousedown|self="{handleClick}">{suggestion.option}</button>
                    </li>
                {/each}
            </div>
        </div>
        {#if id}
            <button on:click="{handleAdd}">Add</button>
        {:else}
            <button class="disabled">Add</button>
        {/if}
        <button id="close" on:mousedown="{handleClose}">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="black" d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
            </svg>
        </button>
    </div>
</div>

<style>
    #close {
        all: unset;
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
    #close path {
        transition: 150ms ease-out;
    }
    #close:hover path {
        fill: red;
    }
    #search-result {
        position: relative;
    }
    #search-result :global(div[list]) {
        background-color: var(--background-color);
        list-style: none;
        box-shadow: 2px 2px 8px hsla(0 0% 10% / 0.3);
        border-radius: 0.75rem;
        overflow: hidden;
        position: absolute;
    }
    
    .option {
        all: unset;
        display: block;
        width: 100%;
        cursor: pointer;
    }
    .option:hover {
        background-color: var(--border-color);
    }
    .option button {
        all: unset !important;
        width: 100%;
        padding: 0.2rem;
    }
    .add-popup {
        padding: 1rem;
        border-radius: 1rem;
        box-shadow: 2px 2px 8px hsla(0 0% 10% / 0.3);
        width: 300px;
        background-color: var(--background-color);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    .add-popup-bg {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: hsla(0 0% 0% / 0.5);
        z-index: 100;
    }
    .popup-header {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    .hide {
        display: none;
    }
    #searchbar {
        outline: none;
        border: 2px solid var(--border-color);
        border-radius: 0.5rem;
        width: 100%;
        padding: 0.5rem;
        font-size: 1em;
        display: block;
    }
    #searchbar:focus {
        border-color: var(--accent-color);
    }
    button:not(#close) {
        all: unset;
        padding: 0.5rem 1rem;
        background-color: var(--accent-color);
        color: white; /* ! */
        border-radius: 0.5rem;
        margin-top: 1rem;
        display: grid;
        place-items: center;
    }
    button:not(#close):hover {
        background-color: var(--accent-darker);
    }
    button.disabled {
        background-color: var(--border-color) !important;
        color: hsl(0, 0%, 40%) !important;
        pointer-events: none !important;
    }
    :global(.option) {
        padding: 0.25rem 0.375rem !important;
    }
</style>

<script>
    import { user } from '$lib/user.js'
    import { goto } from '$app/navigation'
    import toast from '$lib/toast.js'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    let id = ''
    let name = ''
    let inputValue = ''
    let suggestions = []
    
    function handleRemoveList() {
        suggestions = []
    }

    function handleClose() {
        document.querySelector('.add-popup-bg').classList.add('hide')
        inputValue = ''
        id = ''
        name = ''
        toast.pop(0)
    }

    async function handleInput() {
        if (inputValue === '') return handleRemoveList()
        let res = await fetch(`/api/buff/${inputValue}`)
        let suggestionsRes = await res.json()
        if (document.querySelector('#searchbar') == document.activeElement) {
            suggestions = suggestionsRes.res.data.suggestions
        }
    }

    function handleClick(e) {
        name = e.target.textContent
        id = e.target.getAttribute('id')
        inputValue = name
    }

    async function handleAdd() {
        if ($user.skins.includes(id)) {
            return toast({ text: 'Cannot add the same skin twice', dis: true})
        }
        document.querySelector('.add-popup-bg').classList.add('hide')
        dispatch('additem', {
            name, id
        })
        let res1 = await fetch(`/api/setSkin`, {
            method: 'POST',
            body: JSON.stringify({
                id, name
            })
        })
        let data = await res1.json()
        if (Object.keys(data).length === 0) return goto('/login?reason=nologin')
        document.querySelector('#searchbar').value = ''
        id = ''
        name = ''
        let res2 = await fetch('/api/getUser')
        let obj = await res2.json()
        user.set(obj)
    }
</script>