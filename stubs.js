//this file contains stub data for pages

var profPic = '/img/profStub.jpg';

var map = '/img/mapStub.png'

var payments = [{
  id: 1,
  name: 'Chase',
  accountNumber: 445564, 
  exp: 'June 2025', 
  active: true
},{
  id: 2,
  name: 'Apple Pay',
  accountNumber: 25638, 
  exp: 'Aug 2028', 
  active: false
}];

var avatar = [{
  path: '/img/man'
}, {
  path: '/img/man1'
}, {
  path: '/img/woman'
}]

var cars = [{
  id: 1,
  year: 2020,
  make: 'Tesla',
  model: 'Model 3',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'Red',
  img: '/img/civicTypeR2019.png'
},{
  id: 2,
  year: 2019,
  make: 'Tesla',
  model: 'Model S',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'White',
  img: '/img/civicTypeR2019.png'
},{
  id: 3,
  year: 2021,
  make: 'Tesla',
  model: 'Model X',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'Blue',
  img: '/img/civicTypeR2019.png'
},{
  id: 4,
  year: 2021,
  make: 'Tesla',
  model: 'Model Y',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'Black',
  img: '/img/civicTypeR2019.png'
},{
  id: 5,
  year: 2026,
  make: 'Toyota',
  model: 'Avalon',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'Red',
  img: '/img/civicTypeR2019.png'
},{
  id: 6,
  year: 2027,
  make: 'Ford',
  model: 'Focus',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'Blue',
  img: '/img/sonic2019.png'
},{
  id: 7,
  year: 2024,
  make: 'Subaru',
  model: 'Impreza',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'White',
  img: '/img/audiA42018.png'
}];

var rides = [{
  date: Date.now(),
  price: '$' + 35,
  car: '2024 Subaru Impreza',
  start_location: '123 W East St.',
  end_location:'456 S Nort Rd.'
},{
  date: Date.now(),
  price: '$' + 48,
  car: '2027 Ford Focus',
  start_location: '456 W North St.',
  end_location:'456 S North Rd.'
},{
  date: Date.now(),
  price: '$' + 28,
  car: '2024 Subaru Impreza',
  start_location: '123 W East St.',
  end_location:'456 S Nort Rd.'
},{
  date: Date.now(),
  price: '$' + 30,
  car: '2021 Tesla Model Y',
  start_location: '123 W East St.',
  end_location:'456 S Nort Rd.'
}];

var subjects = [
  'Ride Feedback',
  'Site Performance',
  'Payment Options',
  'Profile Issues',
  'Report a Car/Car Owner',
  'Other'
]
module.exports = {
  profPic,
  payments,
  cars,
  map,
  subjects
};