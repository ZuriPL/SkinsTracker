<style>
    h2 {
        font-size: 4rem;
        margin-bottom: 2rem;
    }
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 5rem;
    }
    .slots-grid {
        border: 2px solid var(--border-color);
        border-radius: 1rem;
        max-width: 80ch;
        padding: 1rem;
        width: 90%;
        position: relative;
        overflow: hidden;
    }
    hr {
        all: unset;
        display: block;
        width: 100%;
        margin: 1rem 0;
        height: 2px;
        background-color: var(--border-color);
    }
    details > p {
        padding-top: 1rem;
    }
    details {
        margin: 0 0.25rem;
    }
    summary {
        font-size: 1.25rem;
        font-weight: bold;
        cursor: pointer;
    }
    a {
        color: var(--link-color);
    }
</style>

<main>
    <h2>FAQ</h2>

    <div class="slots-grid">
        <details>
            <summary>What is SkinsTracker?</summary>
            <p>Skinstracker is a simple free service which collects price details about skins and sends you an email with them each day.</p>
        </details>
        <hr>
        <details>
            <summary>How does it work?</summary>
            <p>On the main page you can click the plus button to add a skin. All of your skins show up in a list. When you want to remove a skin, click the cross next to the name of the skin. Internally, everyday a script collects prices from buff.163.com and sends an email. Once you want to stop recieving emails, you can delete or archive your account (coming soon)</p>
        </details>
        <hr>
        <details>
            <summary>Is my password safe?</summary>
            <p>Your passwords are stored in a databse hashed with the bcrypt algorythm, which is designed for storing passwords. If you still don't trust about safety of passwords, the project is open-sorce and can be found in <a href="https://github.com/ZuriPL/skinstracker-site" target="_blank">this repo</a>.</p>
        </details>
    </div>
</main>