export const onRequest: PagesFunction = async (context) => {
    const res = await fetch('https://dog.ceo/api/breeds/image/random')

    return res.json();
}
