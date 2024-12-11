import axios from "axios";

const serverUrl = "http://localhost:3000";
const clubURL = "http://localhost:3001";

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: number;
  badges: string[];
  friends: number[];
}

const mock_user: User = {
  id: 1,
  name: "Sacha du Bourg Palette",
  email: "sacha@bourgpalette.jp",
  badges: ["eau", "feu", "terre", "air"],
  friends: [2, 3, 4, 5],
};

const mock_clubs = [
  { id: 1, name: "Ligue Pokéchakuchon", members: 12 },
  { id: 2, name: "Club des cinq", members: 5 },
  { id: 3, name: "Club de golf", members: 3 },
];

// Vérifie si le token est "test"
function useMockData(): boolean {
  return localStorage.getItem("token") === "test";
}

// Retourne les données fictives pour le profil utilisateur
export async function getUserProfile(): Promise<User> {
  if (useMockData()) {
    console.warn("Using mock user profile data.");
    return mock_user;
  }

  try {
    const response = await axios.get(`${serverUrl}/users/me`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

// Retourne les données fictives pour les amis de l'utilisateur
export async function getUserFriends(): Promise<number[]> {
  if (useMockData()) {
    console.warn("Using mock friends data.");
    return mock_user.friends;
  }

  try {
    const response = await axios.get(`${serverUrl}/user/friends`);
    return response.data;
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw error;
  }
}

// Retourne les données fictives pour les clubs
export async function getClubs(): Promise<{ id: number; name: string; members: number }[]> {
  if (useMockData()) {
    console.warn("Using mock clubs data.");
    return mock_clubs;
  }

  try {
    const response = await axios.get(`${clubURL}/clubs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching clubs:", error);
    throw error;
  }
}

// Ajoute un club avec les données fictives
export async function createClub(name: string): Promise<{ id: number; name: string; members: number }> {
  if (useMockData()) {
    console.warn("Using mock data to create a club.");
    const newClub = { id: mock_clubs.length + 1, name, members: 1 };
    mock_clubs.push(newClub);
    return newClub;
  }

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  try {
    const response = await axios.post(`${clubURL}/clubs`, {
      name,
      user: { id: user.id, name: user.name },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating club:", error);
    throw error;
  }
}

// Permet à l'utilisateur de rejoindre un club avec des données fictives
export async function joinClub(club_id: number): Promise<{ id: number; name: string; members: number }> {
  if (useMockData()) {
    console.warn("Using mock data to join a club.");
    return mock_clubs.find((club) => club.id === club_id) as { id: number; name: string; members: number };
  }

  try {
    const response = await axios.post(`${serverUrl}/user/clubs/${club_id}/join`);
    return response.data;
  } catch (error) {
    console.error("Error joining club:", error);
    throw error;
  }
}

// Retourne les données fictives pour le club de l'utilisateur
export async function getMyClub(): Promise<{ id: number; name: string; members: number } | null> {
  if (useMockData()) {
    console.warn("Using mock data for my club.");
    return mock_clubs[0];
  }

  try {
    const response = await axios.get(`${serverUrl}/user/myclub`);
    return response.data;
  } catch (error) {
    console.error("Error fetching my club:", error);
    throw error;
  }
}

// Simule la sortie d'un club avec des données fictives
export async function leaveClub(name: string): Promise<void> {
  if (useMockData()) {
    console.warn(`Using mock data to leave club: ${name}.`);
    return;
  }

  try {
    await axios.post(`${serverUrl}/user/clubs/leave`);
  } catch (error) {
    console.error("Error leaving club:", error);
    throw error;
  }
}
