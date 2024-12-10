# Clash of Pokechakucha - FrontEnd

## Setup

### Start front service

#### For dev

cd front
npm install
npm run dev

#### For normal use

cd front
docker build -t pokechakucha-front:1.0.0 .
docker run -p 5173:3000  pokechakucha-front:1.0.0

### Test user with mock data

email : test@imt-atlantique.net 
password : test

### To use other microservices instead of mock data

- Run service `user` on port 3000
- Run service `clubs` on port 3001
- Other serivces are WIP

## Contact

For issues or questions, contact:

- Team Lead: [ Nathan CLAEYS ]
- Developers : [ Nathan CLAEYS - Jean Baptiste LAMBERTIN - Antoine CHEUCLE - Felipe LOBATO ]
