import { decrementSparkles, getProfileById, incrementSparkles } from '../fetch-utils.js';

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

async function fetchAndDisplayProfile() {
    profileDetailEl.textContent = '';

    const profile = await getProfileById(id);
    // console.log('profile', profile);
    imgEl.src = profile.avatar_url;
    usernameHeaderEl.textContent = profile.username;

    const profileSparkles = renderSparkles(profile);

    profileDetailEl.append(profileSparkles);
}

function renderSparkles({ sparkles, username, id }) {
    const p = document.createElement('p');
    const downButton = document.createElement('button');
    const upButton = document.createElement('button');

    const profileSparkles = document.createElement('div');

    profileSparkles.classList.add('profile-sparkles');
    profileSparkles.append(p, upButton, downButton);

    downButton.textContent = 'downvote user ⬇️';
    upButton.textContent = 'upvote user ⬆️';
    p.classList.add('profile-name');

    p.textContent = `${username} has ${sparkles} ✨`;

    downButton.addEventListener('click', async () => {
        await decrementSparkles(id);
        await fetchAndDisplayProfile();
    });
    upButton.addEventListener('click', async () => {
        await incrementSparkles(id);
        await fetchAndDisplayProfile();
    });

    return profileSparkles;
}
