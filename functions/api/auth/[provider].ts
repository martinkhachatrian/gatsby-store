export const onRequest: PagesFunction = async (context) => {
    const res = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await res.json();

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    });
}
