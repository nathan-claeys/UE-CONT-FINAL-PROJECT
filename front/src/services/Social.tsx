import axios from 'axios'

const serverUrl = "http://localhost:3000";
const clubURL = "http://localhost:3001";

export interface User {
  name: string;
  email: string;
  createdAt?: number;
  badges: string[];
  friends: string[];
}

const mock_user: User = {
  name: 'Sacha du Bourg Palette',
  email: 'sacha@bourgpalette.jp',
  badges: ['eau', 'feu', 'terre', 'air'],
  friends: ['Ondine', 'Pierre'],
}

const mock_clubs = [
  { id: 1, name: 'Ligue Pokéchakuchon', members: 12 },
  { id: 2, name: 'Club des cinq', members: 5 },
  { id: 3, name: 'Club de golf', members: 3 }
]

const use_mock_data = true

export async function getUserProfile() : Promise<User> {
  try {
    const response = await axios.get(`${serverUrl}/users/me`);
    return {
      name: response.data.username,
      email: response.data.email,
      createdAt: response.data.createdAt,
      badges: mock_user.badges,
      friends: mock_user.friends,
    };
  } catch (error) {
    console.error(error);
    return mock_user; // or throw an error
  }
}

export function getUserFriends() : string[] {
  if (use_mock_data) {
    return mock_user.friends
  }
  axios.get('/user/friends').then((response) => {
    return response.data
  }).catch((error) => {
    console.error(error)
  }
  )
  return mock_user.friends
  
}

export async function getClubs(): Promise<{ id: number, name: string, members: number }[]> {
  return axios.get(`${clubURL}/clubs`).then((response) => {
    return response.data
  }).catch((error) => {
    console.error(error)
  }
  )
}

export async function createClub(name: string): Promise<{ id: number, name: string, members: number }> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  try {
    const response = await axios.post(`${clubURL}/clubs`, {
      name, user: {
        id: user.id,
        name: user.name,
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return { id: 0, name, members: 1 }
}

export function joinClub(club_id: number): { id: number, name: string, members: number } {
  axios.post(`/user/clubs/${club_id}/join`).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.error(error)
  }
  )
  return mock_clubs.find((club) => club.id === club_id) as { id: number, name: string, members: number }
}

export function getMyClub(): { id: number, name: string, members: number } | null {
  if (use_mock_data) {
    return mock_clubs[0]
  }
  axios.get('/user/myclub').then((response) => {
    return response.data
  }).catch((error) => {
    console.error(error)
  }
  )
  return null
}

export function leaveClub(): void {
  axios.post(`/user/clubs/leave`).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.error(error)
  }
  )
}

export const createClub = async (name: string) => {
  if (!name) throw new Error("Club name cannot be empty.");
  console.log(`Created club: ${name}`);
  return new Promise<void>((resolve) => setTimeout(resolve, 1000));
};