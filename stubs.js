//this file contains stub data for pages

var profPic = '/img/profStub.jpg';

var map = '/img/mapStub.png'

var payments = [{
  name: 'Chase', 
  exp: 'June 2025', 
  active: 'active'
},{
  name: 'Apple Pay', 
  exp: 'Aug 2028', 
  active: 'not active'
}];

var avatar = [{
  path: '/img/man'
}, {
  path: '/img/man1'
}, {
  path: '/img/woman'
}]

var cars = [{
  year: 2020,
  make: 'Tesla',
  model: 'Model 3',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'Red',
  img: '/img/civicTypeR2019.png'
},{
  year: 2019,
  make: 'Tesla',
  model: 'Model S',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'White',
  img: '/img/civicTypeR2019.png'
},{
  year: 2021,
  make: 'Tesla',
  model: 'Model X',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'Blue',
  img: '/img/civicTypeR2019.png'
},{
  year: 2021,
  make: 'Tesla',
  model: 'Model Y',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'Black',
  img: '/img/civicTypeR2019.png'
},{
  year: 2026,
  make: 'Toyota',
  model: 'Avalon',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'Red',
  img: '/img/civicTypeR2019.png'
},{
  year: 2027,
  make: 'Ford',
  model: 'Focus',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'Blue',
  img: '/img/sonic2019.png'
},{
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
}]
module.exports = {
  profPic,
  payments,
  cars,
  map
};