const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) { 
          users.push({"username":username,"password":password});
          return res.status(200).json({message: "User successfully registred. Now you can login"});
        } else {
          return res.status(404).json({message: "User already exists!"});    
        }
      } 
      return res.status(404).json({message: "Username or password are not provided."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

    let myPromise = new Promise((resolve,reject) => {
        resolve("Promise resolved")
    })

    myPromise.then((successMessage) => {
        console.log(successMessage)
        res.send(JSON.stringify(books,null,4));
    })
});
  
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        resolve("Promise resolved")
    })

    myPromise.then((successMessage) => {
        console.log(successMessage)
        const isbn = req.params.isbn;
        res.send(books[isbn])
    })

    
});
    
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

    let myPromise = new Promise((resolve,reject) => {
        resolve("Promise resolved")
    })

    myPromise.then((successMessage) => {
        console.log(successMessage)
        
        let author = req.params.author;
        let result = Object.keys(books).map((key) => books[key])
            .filter((el)=>{
                return el.author === author
            });
        res.send(result)
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

    let myPromise = new Promise((resolve,reject) => {
        resolve("Promise resolved")
    })

    myPromise.then((successMessage) => {
        console.log(successMessage)
        
        let title = req.params.title;
        let result = Object.keys(books).map((key) => books[key])
        .filter((el)=>{
        return el.title === title
        });
    
        res.send(result)
    })

    
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
