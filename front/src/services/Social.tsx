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
  { id: 1, name: 'Ligue Pokéchakuchon', members: 12 },
  { id: 2, name: 'Club des cinq', members: 5 },
  { id: 3, name: 'Club de golf', members: 3 }
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

export function getUserClubs(): { id: number, name: string, members: number }[] {
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