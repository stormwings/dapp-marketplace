// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

import "./Product.sol";

event ProductCreated(
    uint id,
    string name,
    uint price,
    address owner,
    bool purchased
);

struct Product {
    uint id;
    string name;
    uint price;
    address owner;
    bool purchased;
}

contract Marketplace {
    string public name;
    uint public productCount = 0;

    mapping(uint => Product) public products;

    constructor() public {
        name = "Dapp University Marketplace";
    }

    function createProduct(string memory _name, uint _price) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        productCount ++;
        // Create the product
        products[productCount] = Product(productCount, _name, _price, msg.sender, false);
        // Trigger an event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }
}