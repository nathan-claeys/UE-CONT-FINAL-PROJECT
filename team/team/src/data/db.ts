import * as fs from "fs";
import * as path from "path";
import {UserTeam} from "../interfaces";

const DATA_DIR = path.join(__dirname, "./data/users");

// Vérifie si le dossier de données existe, sinon le crée.
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Récupère le chemin du fichier JSON d'un utilisateur
const getUserFilePath = (userId: string): string => {
  return path.join(DATA_DIR, `${userId}.json`);
};

// Lecture des données d'un utilisateur
export const getUserData = (userId: string): UserTeam => {
    const filePath = getUserFilePath(userId);
  
    //Si le fichier du joueur n'existe pas (première connexion), crée le fichier
    if (!fs.existsSync(filePath)) {
      const initialData: UserTeam = { 
        collectionCreature: [],
        collectionFreeItem: [], 
        team: []
      };

      fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
      return initialData;
    }
  
    const rawData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(rawData) as UserTeam;
  };

// Écriture des données d'un utilisateur
export const saveUserData = (userId: string, data: UserTeam): void => {
  const filePath = getUserFilePath(userId);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};