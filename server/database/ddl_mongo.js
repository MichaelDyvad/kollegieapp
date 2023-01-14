import db from "./connection.js"
import bcrypt from "bcrypt"

const hashedPassword = await bcrypt.hash("123", 10)

const role = "USER"

const arrayOfResidents = [
{name: "Asger", email:"mail1@mail.dk", password:hashedPassword, room:601, bill:0, role: role},
{name: "Evode", email:"mail2@mail.dk", password:hashedPassword, room:602, bill:0, role: role},
{name: "Freja", email:"mail3@mail.dk", password:hashedPassword, room:603, bill:0, role: role},
{name: "Liva", email:"mail4@mail.dk", password:hashedPassword, room:604, bill:0, role: role},
{name: "Frederikke", email:"mail5@mail.dk", password:hashedPassword, room:605, bill:0, role: role},
{name: "Mert", email:"mail6@mail.dk", password:hashedPassword, room:606, bill:0, role: role},
{name: "Hanne", email:"mail7@mail.dk", password:hashedPassword, room:607, bill:0, role: role},
{name: "Lasse", email:"mail8@mail.dk", password:hashedPassword, room:608, bill:0, role: role},
{name: "Martin", email:"mail9@mail.dk", password:hashedPassword, room:609, bill:0, role: role},
{name: "Clara", email:"mail10@mail.dk", password:hashedPassword, room:610, bill:0, role: role},
{name: "Olivia", email:"mail11@mail.dk", password:hashedPassword, room:611, bill:0, role: role},
{name: "Steff", email:"mail12@mail.dk", password:hashedPassword, room:612, bill:0, role: role},
{name: "Raf", email:"mail13@mail.dk", password:hashedPassword, room:613, bill:0, role: role},
{name: "Camelia", email:"mail14@mail.dk", password:hashedPassword, room:614, bill:0, role: role},
{name: "Josephine", email:"mail15@mail.dk", password:hashedPassword, room:615, bill:0, role: role},
{name: "Isabella", email:"mail16@mail.dk", password:hashedPassword, room:616, bill:0, role: role},
{name: "Setare", email:"mail17@mail.dk", password:hashedPassword, room:617, bill:0, role: role},
{name: "David", email:"mail18@mail.dk", password:hashedPassword, room:618, bill:0, role: role},
{name: "Vilma", email:"mail19@mail.dk", password:hashedPassword, room:619, bill:0, role: role},
{name: "Nikolaj", email:"mail20@mail.dk", password:hashedPassword, room:620, bill:0, role: role},
{name: "Anton", email:"mail21@mail.dk", password:hashedPassword, room:621, bill:0, role: role},
{name: "Marcus", email:"mail22@mail.dk", password:hashedPassword, room:622, bill:0, role: role},
{name: "Jesper", email:"mail23@mail.dk", password:hashedPassword, room:623, bill:0, role: role},
{name: "Monika", email:"mail24@mail.dk", password:hashedPassword, room:624, bill:0, role: role},
{name: "Michael", email:"mail25@mail.dk", password:hashedPassword, room:625, bill:0, role: role},
{name: "Maria", email:"mail26@mail.dk", password:hashedPassword, room:626, bill:0, role: role},
{name: "Daniel", email:"mail27@mail.dk", password:hashedPassword, room:627, bill:0, role: role},
{name: "Annika", email:"mail28@mail.dk", password:hashedPassword, room:628, bill:0, role: role},
{name: "Admin", email: "admin@admin.dk", password: hashedPassword, room: 600, bill:0, role: "ADMIN"}
];

const arrayOfAssortment = [
    {option: 1, type: "Øl/Sodavand", price: 6}, 
    {option: 2, type: "Is", price: 2}
];

const arrayOfLaundry = [
    {day: "monday", room: ""},
    {day: "monday", room: ""},
    {day: "monday", room: ""},
    {day: "monday", room: ""},
    {day: "monday", room: ""},
    {day: "monday", room: ""},
    {day: "monday", room: ""},
    {day: "monday", room: ""},
    {day: "monday", room: ""},
    {day: "monday", room: ""},
    
    {day: "tuesday", room: ""},
    {day: "tuesday", room: ""},
    {day: "tuesday", room: ""},
    {day: "tuesday", room: ""},
    {day: "tuesday", room: ""},
    {day: "tuesday", room: ""},
    {day: "tuesday", room: ""},
    {day: "tuesday", room: ""},
    {day: "tuesday", room: ""},
    {day: "tuesday", room: ""},

    {day: "wednesday", room: ""},
    {day: "wednesday", room: ""},
    {day: "wednesday", room: ""},
    {day: "wednesday", room: ""},
    {day: "wednesday", room: ""},
    {day: "wednesday", room: ""},
    {day: "wednesday", room: ""},
    {day: "wednesday", room: ""},
    {day: "wednesday", room: ""},
    {day: "wednesday", room: ""},

    {day: "thursday", room: ""},
    {day: "thursday", room: ""},
    {day: "thursday", room: ""},
    {day: "thursday", room: ""},
    {day: "thursday", room: ""},
    {day: "thursday", room: ""},
    {day: "thursday", room: ""},
    {day: "thursday", room: ""},
    {day: "thursday", room: ""},
    {day: "thursday", room: ""},

    {day: "friday", room: ""},
    {day: "friday", room: ""},
    {day: "friday", room: ""},
    {day: "friday", room: ""},
    {day: "friday", room: ""},
    {day: "friday", room: ""},
    {day: "friday", room: ""},
    {day: "friday", room: ""},
    {day: "friday", room: ""},
    {day: "friday", room: ""},

    {day: "saturday", room: ""},
    {day: "saturday", room: ""},
    {day: "saturday", room: ""},
    {day: "saturday", room: ""},
    {day: "saturday", room: ""},
    {day: "saturday", room: ""},
    {day: "saturday", room: ""},
    {day: "saturday", room: ""},
    {day: "saturday", room: ""},
    {day: "saturday", room: ""},

    {day: "sunday", room: ""},
    {day: "sunday", room: ""},
    {day: "sunday", room: ""},
    {day: "sunday", room: ""},
    {day: "sunday", room: ""},
    {day: "sunday", room: ""},
    {day: "sunday", room: ""},
    {day: "sunday", room: ""},
    {day: "sunday", room: ""},
    {day: "sunday", room: ""},
];

db.residents.deleteMany({})
db.assortment.deleteMany({})

db.laundry.insertMany(arrayOfLaundry);
db.residents.insertMany(arrayOfResidents);
db.assortment.insertMany(arrayOfAssortment);