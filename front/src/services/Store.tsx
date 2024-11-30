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
    //à remplacer par un appel API
    const res = [];
    for (const pokechakuchon of mockdata_pokechakuchon) {
        res.push({name : pokechakuchon.name, description : "Type: " + pokechakuchon.type +"\n"+"   Price: " + pokechakuchon.price})
    }
    return res
}

const getItemsInStore = async () => {
    //à remplacer par un appel API
    const res = [];
    for (const item of mockdata_items) {
        res.push({name : item.name, description : "Price: " + item.price})
    }
    return res
}

const buyItem = async (id: String) => {
    console.log("buying item with name: ", id)
    //à remplacer par un appel API
}

const buyPokechakuchon = async (id: String) => {
    console.log("buying pokechakuchon with name: ", id)
    //à remplacer par un appel API
}

export { getPechakuchonInStore, getItemsInStore, buyItem, buyPokechakuchon }