import axios from 'axios'

export interface User {
  name: string;
  email: string;
  age: number;
  badges: string[];
  friends: string[];
}

const mock_user: User = {
  name: 'Sacha du Bourg Palette',
  email: 'sacha@bourgpalette.jp',
  age: 12,
  badges: ['eau', 'feu', 'terre', 'air'],
  friends: ['Ondine', 'Pierre'],
}

const mock_clubs = [
  { name: 'Ligue Pokéchakuchon', members: 12 },
  { name: 'Club des cinq', members: 5 },
  { name: 'Club de golf', members: 3 }
]

const use_mock_data = true

export function getUserProfile() : User {
  if (use_mock_data) {
    return mock_user
  }
  axios.get('/user/profile').then((response) => {
    return response.data
  }).catch((error) => {
    console.error(error)
  }
  )
  return mock_user
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

export function getUserClubs(): { name: string, members: number }[] {
  if (use_mock_data) {
    return mock_clubs
  }
  axios.get('/user/clubs').then((response) => {
    return response.data
  }).catch((error) => {
    console.error(error)
  }
  )
  return mock_clubs
}


