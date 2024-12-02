// List of creatures just to try 
let creatures = [
    { id: "1", name: "Charmander", cost: 100, type: "fire", power: 5 },
    { id: "2", name: "Bulbasaur", cost: 80, type: "grass", power: 6 },
  ];
  
  export const resolvers = {
    //get all creatures
    getCreatures: () => creatures,
  
    // get creature by id
    getCreature: ({ id }: { id: string }) => creatures.find((creature) => creature.id === id),
  
    // add a new creature 
    addCreature: ({ input }: { input: { name: string; cost: number; type: string; power: number } }) => {
      const newCreature = {
        id: String(creatures.length + 1),  
        ...input,  
      };
      creatures.push(newCreature);  
      return newCreature;
    },
  
    // delete a creature 
    deleteCreature: ({ id }: { id: string }) => {
      const index = creatures.findIndex((creature) => creature.id === id);
      if (index === -1) {
        throw new Error("Creature not found");
      }
      creatures.splice(index, 1);  
      return `Creature with id ${id} deleted successfully.`;
    },
  };
  