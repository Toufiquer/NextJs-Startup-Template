/*
|-----------------------------------------
| setting up service for takeaway
| @author: Jahid Haque <jahid.haque@yahoo.com>
| @copyright: mealnight, 2023
|-----------------------------------------
*/

export const getTakeaway = async (token: string, alias: string) => {

    const request = await fetch(`${process.env.API}/checkout/kitchen/${alias}`);

    if (request.status === 200) {
        const response = await request.json();
        return response.content;
    }

    return false;
}

export const getMenu = async (name: string, alias: string) => {
    const request = await fetch(`${process.env.API}/checkout/menu/${name}/${alias}`);
    if (request.status === 200) {
        const response = await request.json();
        return response.content;
    }

    return false;
}
