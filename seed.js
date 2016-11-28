/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');//
var faker = require('faker');//
var Promise = require('sequelize').Promise;//
var db = require('./server/db');//

var User = db.model('user');//
var Address = db.model('address');//
var Order = db.model('order');//
var Instrument = db.model('instrument');//
var Review = db.model('review');
var OrderItem = db.model('orderitem'); //added
var Email = db.model('email');
var Contact = db.model('contact');

var numUsers = 10;//


var randomDate = function(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

var seedUsers = function () {

    var users = [
        {
            email: 'ronpaul@gmail.com',
            password: '1111',
            firstName: 'ron',
            lastName: 'paul',
            phone: '777-777-7777',
            type: 'Admin',
            //avatar: faker.image.avatar()
        },

        {
            email: 'bush@gmail.com',
            password: 'potus',
            firstName: 'Bill',
            lastName: 'Clinton',
            phone: '888-888-8887',
            avatar: faker.image.avatar()
        },        
    ];

    for (var i = 0; i < numUsers - 1; i++) {
        users.push({
            email: faker.internet.email(),
            password: 'password',
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phone: faker.phone.phoneNumber(),
            avatar: faker.image.avatar()
        });
    }

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

}; //good

var seedAddresses = function() {

    var addresses = [];
    for (var i = 0; i < numUsers; i++) {
        addresses.push({
            line1: faker.address.streetAddress(),
            line2: faker.address.secondaryAddress(),
            city: faker.address.city(),
            state: faker.address.stateAbbr(),
            zip: Number(faker.address.zipCode().slice(0,5)),
            type: ['billing', 'shipping'][Math.round(Math.random())],
            country: "US",
            userId: Math.floor(Math.random() * (numUsers - 1)) + 1
        });
    }

    var creatingAddresses = addresses.map(function(addrObj) {
        return Address.create(addrObj);
    });

    return Promise.all(creatingAddresses);

};//good

var seedOrders = function() {

    var orders = [];
    for (var i = 0; i < numUsers; i++) {

        var isPlaced = [false, true][[Math.round(Math.random())]]

        orders.push({
            status: (isPlaced? 'order': 'cart'),
            orderDate: (isPlaced? randomDate(new Date(2012, 0, 1), new Date()): null),
            userId: Math.floor(Math.random() * (numUsers - 1)) + 1,
            addressId: i+1, // added

        });
    }

    orders.push({
        id: 50,
        status:'cart',
        userId: 1,
        addressId: 1,
    }) //added this order to special testing

    var creatingOrders = orders.map(function(orderObj) {
        return Order.create(orderObj);
    });

    return Promise.all(creatingOrders);

};

var seedInstruments = function() {
    function randomIt(min,max){
        return Math.floor((Math.random() * max) + min);
    };
    var productType = ['Guitar','Drums','Bass','DJ','Band & Orchestra','Mics & Wireless'];
    var instruments = [];
    
    for (var i = 0; i < numUsers+25; i++) {
        var idx = randomIt(1,6);
        instruments.push({
            title: productType[idx-1] + " " + (i+1),
            brand: "brand" + randomIt(1,15),
            price: (Math.random()*100.00).toFixed(2),
            family: "family" + randomIt(1,5),
            type: productType[idx-1],
            description: faker.company.bs(),
            image: [faker.image.imageUrl(250, 250) + "?v=" + randomIt(0,1000),faker.image.imageUrl(250, 250) + "?v=" + randomIt(0,1000),faker.image.imageUrl(250, 250) + "?v=" + randomIt(0,1000)],
            quantity: randomIt(1,99)
        });
    }

    var creatingInstruments = instruments.map(function(instrumentObj) {
        return Instrument.create(instrumentObj);
    });

    return Promise.all(creatingInstruments);

};

var seedReviews = function() {
    var reviews = [];
    for (var i = 0; i < numUsers; i++) {

        reviews.push({
            content: faker.lorem.paragraph(),
            rating: Math.floor(Math.random() * 5 + 1),
            date: randomDate(new Date(2012, 0, 1), new Date()),
            title: faker.lorem.words(),
            userId: Math.floor(Math.random() * (numUsers - 1)) + 1,
            instrumentId: Math.floor(Math.random() * (numUsers - 1)) + 1
        });
    }

    var creatingReviews = reviews.map(function(reviewObj) {
        return Review.create(reviewObj);
    });

    return Promise.all(creatingReviews);
}

var seedContact = function(){
    var contacts=[];
    contacts.push({
        emailAddress:"superrichcard3@gmail.com",
        toWhom:"donald",
        userId:1,
    });
    contacts.push({
        emailAddress:"superrichcard5@yahoo.com",
        toWhom:"clinton",
        userId:1,
    });

    contacts.push({
        emailAddress:"test1@yahoo.com",
        toWhom:"rubio",
        userId:1,
    });


    contacts.push({
        emailAddress:"test2@yahoo.com",
        toWhom:"lying ted",
        userId:1,
    });


    contacts.push({
        emailAddress:"test3@yahoo.com",
        toWhom:"ben",
        userId:1,
    });


    contacts.push({
        emailAddress:"test4@yahoo.com",
        toWhom:"bush",
        userId:1,
    });


    var creatingContacts = contacts.map(function (contactObj) {
        return Contact.create(contactObj);
    });

    return Promise.all(creatingContacts);

}



var seedEmails = function(){
    var emails= [];
    
    emails.push({
        emailAddress: "superrichcard2@gmail.com",
        toWhom: "donald",
        fromWhom: "paul",
        reason:"support in the presidential election.",
        isSent:false,
        userId:1,
        template:"goofy",
    });

    emails.push({
        emailAddress: "superrichcard3@gmail.com",
        toWhom: "rino",
        fromWhom: "paul",
        reason:"contribution to the company. your last project was awsome!",
        isSent:false,
        userId:1,
        template:"donald",
    });

    emails.push({
        emailAddress: "superrichcard4@gmail.com",
        toWhom: "clinton",
        fromWhom: "paul",
        reason:"being an easy opponent in the presidential election.",
        isSent:false,
        userId:1,
        template:"goofy",
    });

    var creatingEmails = emails.map(function (emailObj) {
        return Email.create(emailObj);
    });

    return Promise.all(creatingEmails);

    
}

var seedOrderItems = function() {

    var orderItems = [];
    for (var i = 0; i < numUsers; i++) {

        orderItems.push({
            quantity: i+1,
            price: i+1,
            orderId: i+1,
            instrumentId: i+1,
        });

        orderItems.push({
            quantity:5+i,
            price:5,
            orderId:6,
            instrumentId:3
        });

        orderItems.push({
            quantity:10+i,
            price:2,
            orderId:50,
            instrumentId:4,
        })

    }

    var creatingOrderItems = orderItems.map(function(orderItemsObj) {
        return OrderItem.create(orderItemsObj);
    });

    return Promise.all(creatingOrderItems);

}; //added order items seed


db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function() {
        return Promise.all([
            seedAddresses(),
            seedOrders(),
            seedInstruments()
            ]);
    })
    .then(function() {
        return Promise.all([
            seedReviews(),
            seedOrderItems(),
            seedEmails(),
            seedContact(),
            ]);
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
