

//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');

var currentProducts = "SELECT * FROM products";
var selectById = "SELECT * FROM bamazon.products WHERE id=";

if(process.argv[2]=="insert"){
    command = "INSERT INTO products SET ?"
    insertProducts()
};

//create connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect();

connection.query(`SELECT * FROM products`, function(err, res){
    if (err) throw err;

    console.log("hello from bamazon");

    for(var i = 0; i<res.length;i++){
        console.log("item_id: " + res[i].item_id + " | " + "product_name " + res[i].product_name + " | " + "department_name " + res[i].department_name + " | " + "price: " + res[i].price + " | " + "stock_quantity " + res[i].stock_quantity);
        console.log('--------------------------------------------------------------------------------------------------')
      }
});

inquirer.prompt([
    {
        type: "input",
        name: "item_id",
        message: "what is the item_id of the product you're looking for",
       
    }
])



  



