
var mysql = require('mysql');
var inquirer = require('inquirer');



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
       
      }
});

function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}


function promptUserPurchase() {
	
	inquirer.prompt([
		{
			type: "input",
			name: "item_id",
			message: "Please enter the Item ID which you would like to purchase.",
			validate: validateInput,
			filter: Number
		},
		{
			type: "input",
			name: "quantity",
			message: "How many do you need?",
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {
		

		var item = input.item_id;
		var quantity = input.quantity;

		
		var Infostr = 'SELECT * FROM products WHERE ?';

		connection.query(Infostr, {item_id: item}, function(err, data) {
			if (err) throw err;

			

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID.');
				displayInventory();

			} else {
				var productData = data[0];

				if (quantity <= productData.stock_quantity) {
					console.log('the item you selected is in stock, placing order!');

					
					var updateInfostr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
				
					connection.query(updateInfostr, function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with bamazon!');
						console.log("\n---------------------------------------------------------------------\n");

						
						connection.end();
					})
				} else {
					console.log('out of stock try again tomorrow.');
					console.log('Please change your order.');
					console.log("\n---------------------------------------------------------------------\n");

					displayInventory();
				}
			}
		})
	})
}


