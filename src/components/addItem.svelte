<div class="add-popup-bg hide" on:mousedown|self="{handleClose}">
    <div class="add-popup">
        <h2 class="popup-header">New</h2>
        <div id="search-result">
            <input autocomplete="off" type="text" on:input="{handleInput}" on:focus="{handleInput}" on:blur="{handleRemoveList}" id="searchbar"/>
        </div>
        <ErrorMsg show="{show}" msg="Cannot add the same skin twice" style="margin-top: 0.5rem;" />
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
        background-color: white;
        list-style: none;
        box-shadow: 2px 2px 8px hsla(0 0% 10% / 0.3);
        border-radius: 0.75rem;
        overflow: hidden;
        position: absolute;
    }
    
    #search-result :global(div[list] button) {
        all: unset;
        padding: 0.2rem;
        display: block;
        width: 100%;
    }
    #search-result :global(div[list] button:hover) {
        background-color: var(--border-color);
    }
    .add-popup {
        padding: 1rem;
        border-radius: 1rem;
        box-shadow: 2px 2px 8px hsla(0 0% 10% / 0.3);
        width: 300px;
        background-color: white;
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
        border-radius: 0.75rem;
        width: 100%;
        padding: 0.5rem;
        font-size: 1em;
        display: block;
    }
    #searchbar:focus {
        border-color: #5f91f0;
    }
    button:not(#close) {
        all: unset;
        padding: 0.5rem 1rem;
        background-color: #5f91f0;
        color: white;
        border-radius: 0.75rem;
        margin-top: 1rem;
        display: grid;
        place-items: center;
    }
    button:not(#close):hover {
        background-color: #4480de;
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
    import ErrorMsg from './errorMsg.svelte';
    import { user } from '$lib/user.js'

    let id
    let name
    let lastValue = ''
    let show

    function handleRemoveList() {
        document.querySelector('div[list]')?.remove()
    }

    function handleClose() {
        document.querySelector('.add-popup-bg').classList.add('hide')
        show = false
    }

    function ready(e, suggestions) {
        if (e.target.value === suggestions[0].option) { 
            id = suggestions[0].goods_ids
            name = suggestions[0].option
        }
    }
    
    async function handleInput(e) {
        if (lastValue !== e.target.value) id = undefined 
        lastValue = e.target.value
        if (e.target.value == '') {
            handleRemoveList()
            return
        }
        let res = await fetch(`/api/buff/${e.target.value}`)
        let suggestions = await res.json()
        ready(e, suggestions.res.data.suggestions)
        
        let suggestionsList = document.createElement('div')
        suggestionsList.setAttribute('list', '')
        for (const skin of suggestions.res.data.suggestions) {
            let suggestionElement = document.createElement('button')
            suggestionElement.textContent = skin.option
            suggestionElement.classList.add('option')
            suggestionElement.setAttribute('id', skin['goods_ids'])
            suggestionElement.addEventListener('mousedown', ev => {
                if (ev.button != 0) return
                document.querySelector('#searchbar').value = ev.target.textContent
                ready(e, [{ option: ev.target.textContent, goods_ids: ev.target.id }], true)
                lastValue = ev.target.textContent
            })
            suggestionsList.appendChild(suggestionElement)
        }
        document.querySelector('div[list]')?.remove()
        if (document.querySelector('#searchbar') === document.activeElement) {
            document.querySelector('#search-result').appendChild(suggestionsList)
        }
    }

    async function handleAdd() {
        if ($user.skins.includes(id)) {
            show = true
            return
        }
        await fetch(`/api/setSkin`, {
            method: 'POST',
            body: JSON.stringify({
                id, name
            })
        })
        document.querySelector('.add-popup-bg').classList.add('hide')
        show = false
        document.querySelector('#searchbar').value = ''
        id = undefined
        name = undefined
        let res = await fetch('/api/getUser')
        let obj = await res.json()
        user.set(obj)
    }
</script>