//this file contains stub data for pages

var profPic = '/img/profStub.jpg';

var map = '/img/mapStub.png'

var payments = [{
  name: 'Chase', 
  exp: 'June 2025', 
  active: 'active'
}, {
  name: 'Apple Pay', 
  exp: 'Aug 2028', 
  active: 'not active'
}];

var cars = [{
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
module.exports = {
  profPic,
  payments,
  cars,
  map
};