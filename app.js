/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { getProfileById, getProfiles } from './fetch-utils.js';
import { renderProfile } from './render-utils.js';

/* Get DOM Elements */
const profileHeaderDiv = document.querySelector('.profile-header-div');
const profileHeader = document.querySelector('.profile-header');
const profileHeaderImage = document.querySelector('.profile-header-image');
const listEl = document.querySelector('.list');

/* State */
const params = new URLSearchParams(location.search);
const id = params.get('id');
/* Events */
window.addEventListener('load', async () => {
    fetchAndDisplayProfiles();
    fetchAndDisplayProfile();
});
/* Display Functions */
async function fetchAndDisplayProfiles() {
    listEl.textContent = '';
    const profiles = await getProfiles();

    for (let profile of profiles) {
        const profileEl = renderProfile(profile);
        listEl.append(profileEl);
    }
}
async function fetchAndDisplayProfile() {
    profileHeader.textContent = '';

    const profile = await getProfileById(id);
    console.log('profile', profile);
    if (profile.avatar_url) {
        profileHeaderImage.src = profile.avatar_url;
    } else {
        profileHeaderImage.src = '/assets/sadface.png';
    }
    profileHeader.textContent = `Welcome ${profile.username}`;

    profileHeaderDiv.append(profileHeaderImage, profileHeader);
}
