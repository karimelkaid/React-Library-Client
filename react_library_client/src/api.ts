const apiBasename = "http://localhost:3000";

export async function get_authors() {
    const res = await fetch(`${apiBasename}/authors`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const authors = await res.json();
    return authors;
}
