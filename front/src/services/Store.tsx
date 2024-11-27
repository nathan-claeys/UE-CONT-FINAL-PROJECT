//mock data for the store

const mockdata_pokechakuchon = [
    {
        "id" : 1,
        "name" : "Carahess",
        "type" : "aqua",
        "price" : 100
    },
    {
        "id" : 2,
        "name" : "Bulnormal",
        "type" : "plante",
        "price" : 200
    },
    {
        "id" : 3,
        "name" : "Conferex",
        "type" : "feu",
        "price" : 300
    },
    {
        "id" : 4,
        "name" : "Apikachu",
        "type" : "électrique",
        "price" : 400
    },
    {
        "id" : 5,
        "name" : "Oldone",
        "type" : "psy",
        "price" : 500
    }
]

const mockdata_items = [
    {
        "id" : 1,
        "name" : "Potion",
        "price" : 50
    },
    {
        "id" : 2,
        "name" : "Super Potion",
        "price" : 100
    },
    {
        "id" : 3,
        "name" : "Hyper Potion",
        "price" : 150
    },
    {
        "id" : 4,
        "name" : "Max Potion",
        "price" : 200
    }
]

//actual store api call

const getPechakuchonInStore = async () => {
    return mockdata_pokechakuchon //à remplacer par un appel API
}

const getItemsInStore = async () => {
    return mockdata_items //à remplacer par un appel API
}

const buyItem = async (id: number) => {
    console.log("buying item with id: ", id)
    //à remplacer par un appel API
}

const buyPokechakuchon = async (id: number) => {
    console.log("buying pokechakuchon with id: ", id)
    //à remplacer par un appel API
}

export default { getPechakuchonInStore, getItemsInStore, buyItem, buyPokechakuchon }