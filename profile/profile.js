import '../auth/user.js';
import {
    createMessage,
    decrementSparkles,
    getProfileById,
    getProfileByUser,
    getUser,
    incrementSparkles,
    onMessage,
} from '../fetch-utils.js';
import { renderMessages } from '../render-utils.js';

const imgEl = document.querySelector('#avatar-img');
const usernameHeaderEl = document.querySelector('.username-header');
const messageFeedEl = document.querySelector('.message-feed-for');
const profileDetailEl = document.querySelector('.profile-detail');
const profileBioEl = document.querySelector('.profile-bio');
const profileMessagesEl = document.querySelector('.profile-messages');
const titleEl = document.querySelector('.title');
const usernameEl = document.querySelector('.username');
const messageForm = document.querySelector('.message-form');

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

    onMessage(id, async (payload) => {
        // eslint-disable-next-line no-console
        console.log(payload);
        fetchAndDisplayProfile();
    });
});

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(messageForm);
    const user = getUser();
    const senderProfile = await getProfileByUser(user.id);
    console.log('user', user);
    console.log('senderProfile', senderProfile);
    if (!senderProfile) {
        alert('Make a profile first!');
        location.assign('/');
    } else {
        await createMessage({
            text: data.get('message'),
            sender: senderProfile.data.username,
            recipient_id: id,
            user_id: user.id,
        });
        messageForm.reset();
    }
});

async function fetchAndDisplayProfile() {
    profileDetailEl.textContent = '';
    profileBioEl.textContent = '';
    profileMessagesEl.textContent = '';
    titleEl.textContent = '';

    const profile = await getProfileById(id);
    // console.log('profile', profile);
    if (profile.avatar_url) {
        imgEl.src = profile.avatar_url;
    } else {
        imgEl.src = '/assets/sadface.png';
    }
    usernameHeaderEl.textContent = profile.username;
    titleEl.textContent = `${profile.username}'s Profile`;
    usernameEl.textContent = profile.username;
    messageFeedEl.textContent = `Message Feed for ${profile.username}`;
    const profileSparkles = renderSparkles(profile);
    const profileBio = renderBio(profile);
    const messagesList = renderMessages(profile);

    profileDetailEl.append(profileSparkles);
    profileBioEl.append(profileBio);
    profileMessagesEl.append(messagesList);
}

function renderSparkles({ sparkles, username, id }) {
    const p = document.createElement('p');
    const downButton = document.createElement('button');
    const upButton = document.createElement('button');
    const buttons = document.createElement('div');

    buttons.append(downButton, upButton);
    const profileSparkles = document.createElement('div');

    profileSparkles.classList.add('profile-sparkles');
    profileSparkles.append(p, buttons);

    downButton.textContent = '➖';
    upButton.textContent = '➕';
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
function renderBio({ bio }) {
    const p = document.createElement('p');
    p.classList.add('bio');
    p.textContent = bio;
    return p;
}
