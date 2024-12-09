const allMyItems = [
    {name : "Potion", description : "description"},
    {name : "Super Potion", description : "description"},
]

const myUsedItems = [
    {name : "Hyper Potion", description : "description"},
    {name : "Max Potion", description : "description"},
]

const allMyPechkuchon = [
    {name : "Carahess", description : "description"},
    {name : "Bulnormal", description : "description"},
    {name : "Conferex", description : "description"},
]

const myUsedPechakuchon = [
    {name : "Apikachu", description : "description"},
    {name : "Oldone", description : "description"},
]


const getAllMyPechkuchon = async () => {
    return allMyPechkuchon;
}

const getMyUsedPechakuchon = async () => {
    return myUsedPechakuchon;
}

const getAllMyItems = async () => {
    return allMyItems;
}

const getMyUsedItems = async () => {
    return myUsedItems;
}

const sellItem = async (item: {name: string, description: string}) => {
    console.log("Selling item", item);
}

const sellPechakuchon = async (item: {name: string, description: string}) => {
    console.log("Selling pechakuchon", item);
}

const reloadPage = () => {
    window.location.reload();
}

const usePokechakuchon = (name:String) => {
}

const useItem = (name:String) => {
}

const dontUsePokechakuchon = (name:String) => {
}

const dontUseItem = (name:String) => {
}

export {getAllMyItems, getMyUsedItems, getAllMyPechkuchon, getMyUsedPechakuchon, sellItem, sellPechakuchon, reloadPage, usePokechakuchon, useItem, dontUsePokechakuchon, dontUseItem};
