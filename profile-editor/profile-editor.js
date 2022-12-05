import { getUser } from '../fetch-utils.js';

const errorDisplay = document.getElementById('error-display');
const preview = document.getElementById('preview');
const profileForm = document.getElementById('profile-form');
const updateButton = profileForm.querySelector('button');
const userNameInput = profileForm.querySelector('[name=username]');
const avatarInput = profileForm.querySelector('[name=avatar]');
const bioInput = profileForm.querySelector('[name=bio]');

let error = null;
let profile = null;

const user = getUser();
