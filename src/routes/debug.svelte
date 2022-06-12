<script>
    import {user} from '$lib/user'

    async function handleLogin() {
        let res = await fetch('/api/loginTest', {
            method: 'POST',
            body: JSON.stringify({
                login: 'michal.bak2007@gmail.com',
                password: 'qwerty123'
            })
        })
        let text = await res.json()
        if (text.error != undefined) return
        user.set(text)
    }
    // async function handleLogin() {
    //     const email = document.querySelector('#email').value
    //     const password = document.querySelector('#pass').value
    //     if (email == '' || password == '') return
    //     let res = await fetch(`/api/login/${email}-${password}`)
    //     let text = await res.json()
    //     if (text.error != undefined) return
    //     user.set(text)
    // }
</script>

<h1>Debug Page</h1>

<label for="email">Email:</label>
<input type="text" id="email" />
<label for="pass">Password:</label>
<input type="text" id="pass" />
<button on:click="{handleLogin}">Login</button>
<br>

<p>{JSON.stringify($user)}</p>

<style>
    * {
        margin: 5px;
    }
</style>

