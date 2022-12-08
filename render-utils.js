export function renderProfile(profile) {
    const a = document.createElement('a');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const h3 = document.createElement('h3');

    a.classList.add('profile-list-item');
    img.classList.add('avatar');
    h3.classList.add('profile-link');
    p.classList.add('list-sparkle');

    if (profile.avatar_url) {
        img.src = profile.avatar_url;
    } else {
        img.src = '/assets/sadface.png';
    }

    img.alt = 'avatar';
    p.textContent = `✨${profile.sparkles}`;
    h3.textContent = `${profile.username}`;
    a.href = `../profile/?id=${profile.id}`;

    a.append(img, h3, p);
    return a;
}

export function renderMessages(profile) {
    const ul = document.createElement('ul');

    ul.classList.add('messages');

    for (let i = 0; i < profile.messages.length; i++) {
        // for (let i = profile.messages.length -1; i > -1; i--)
        // console.log('i', profile.messages[i]);
        const li = document.createElement('p');
        li.classList.add('message');

        const div = document.createElement('div');
        div.classList.add('message-info');

        // const img = document.createElement('img');
        // img.classList.add('avatar-thumbnail');
        // img.src = profile.messages[i].sender;
        // img.alt = 'avatar';

        // if (profile.data.avatar_url) {
        //     img.src = profile.data.avatar_url;
        // } else {
        //     img.src = '/assets/sadface.png';
        // }
        // img.alt = 'avatar';

        const senderSpan = document.createElement('span');
        senderSpan.classList.add('from');
        senderSpan.textContent = `${profile.messages[i].sender} - `;

        const dateSpan = document.createElement('span');
        dateSpan.classList.add('created-date');
        dateSpan.textContent = new Date(profile.messages[i].created_at).toLocaleString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });

        const text = document.createElement('p');
        text.classList.add('text');
        text.textContent = profile.messages[i].text;

        div.append(senderSpan, dateSpan);

        li.append(div, text);

        ul.append(li);
    }

    return ul;
}
