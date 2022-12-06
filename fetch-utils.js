const SUPABASE_URL = 'https://cvpnauqokinnpwanskbe.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2cG5hdXFva2lubnB3YW5za2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDgwNDMsImV4cCI6MTk4MzY4NDA0M30.A8Io_J4_NWTx-iVGngaqEBOxKmW8AGDymaSwiRF2Q0Q';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
function checkError(response) {
    // eslint-disable-next-line no-console
    return response.error ? console.error(response.error) : response.data;
}

export async function upsertProfile(profile) {
    const response = await client
        .from('profiles')
        .upsert(profile, { onConflict: 'user_id' })
        .single();
    // console.log('response- upsert', response);
    return checkError(response);
}
export async function getProfileByUser(user_id) {
    const response = await client.from('profiles').select('*').match({ user_id }).maybeSingle();
    return response;
}
export async function getProfileById(id) {
    const response = await client.from('profiles').select('*').match({ id }).single();
    return checkError(response);
}

export async function getProfiles() {
    const response = await client.from('profiles').select();
    return checkError(response);
}

export async function uploadImage(imagePath, imageFile) {
    const bucket = client.storage.from('avatars');
    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });

    if (response.error) {
        return null;
    }
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;
    return url;
}

export async function incrementSparkles(id) {
    const profile = await getProfileById(id);

    const response = await client
        .from('profiles')
        .update({ sparkles: profile.sparkles + 1 })
        .match({ id });

    return checkError(response);
}

export async function decrementSparkles(id) {
    const profile = await getProfileById(id);

    const response = await client
        .from('profiles')
        .update({ sparkles: profile.sparkles - 1 })
        .match({ id });

    return checkError(response);
}

export async function deleteProfile(user_id) {
    const response = await client.from('profiles').delete().match({ user_id }).single();
    return checkError(response);
}
