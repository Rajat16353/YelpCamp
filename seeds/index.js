if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const imgs = require('./images');


const cities = require('cities.json');
const countries = require("i18n-iso-countries");


const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;

//create database connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//check if connection is succesfull
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const randomImage = imgArray => imgArray[Math.floor(Math.random() * imgArray.length)];
//function to get random places and descriptors from their arrays
const sample = array => array[Math.floor(Math.random() * array.length)];

//async function to delete all the previous data and add random 50 entries to the dataset
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const price = Math.floor(Math.random() * 20) + 10;
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const camp = new Campground({
            author: '5fe5cc27535f2518c58f6c21',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${randomCity.name}, ${countries.getName(randomCity.country, "en", { select: "official" })}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, fugiat necessitatibus? Autem qui, aliquam explicabo minus non cum unde, laudantium ex blanditiis maxime delectus, dolorem velit eos voluptatibus et deserunt!',
            price: price,
            geometry: {
                type: 'Point',
                coordinates: [randomCity.lng, randomCity.lat]
            },
            images: [randomImage(imgs), randomImage(imgs)]
        });
        await camp.save();
    }
}

//close the connection after seedDB is completed
seedDB().then(() => {
    console.log('Data updated')
    mongoose.connection.close();
})