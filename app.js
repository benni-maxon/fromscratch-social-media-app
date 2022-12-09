/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { fetchCurrentUser, getProfileByUser, getProfiles, redirectIfNoProfile } from './fetch-utils.js';
import { renderProfile } from './render-utils.js';

/* Get DOM Elements */
const listEl = document.querySelector('.list');

/* State */
let currentUser;

/* Events */
window.addEventListener('load', async () => {
    currentUser = await fetchCurrentUser();
    redirectIfNoProfile(currentUser);
    fetchAndDisplayProfiles();
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
