export function renderProfile(profileObject) {
    const a = document.createElement('a');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const h3 = document.createElement('h3');

    a.classList.add('profile-list-item');
    img.classList.add('avatar');
    h3.classList.add('profile-link');
    p.classList.add('list-sparkle');

    img.src = profileObject.avatar_url;
    img.alt = 'avatar';
    p.textContent = `✨${profileObject.sparkles}`;
    h3.textContent = `${profileObject.username}`;
    a.href = `../profile/?id=${profileObject.id}`;

    a.append(img, h3, p);
    return a;
}
