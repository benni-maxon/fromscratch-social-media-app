
const imgEl = document.querySelector('#avatar-img');
const usernameHeaderEl = document.querySelector('.username-header');
const profileDetailEl = document.querySelector('.profile-detail');

const params = new URLSearchParams(location.search);
const id = params.get('id');

window.addEventListener('load', async () => {
    //Error Handling
    if (!id) {
        // No id found, redirect back to room list
        location.assign('/');
        //don't run the rest of the cod in the function
        return;
    }
    fetchAndDisplayProfile();
});