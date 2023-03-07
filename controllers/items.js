/**
 * Author: Zhack Ariya
 * Sample Item Controllers
 */
let items = require('../resources/items');
const { v4: uuidv4 } = require('uuid');


const getItems = (req, reply) => {
	reply.send(items);
};

const getItem = (req, reply) => {

	const { id } = req.params;
	const item = items.find((item) => item.id === id);
	if (!item) {
		reply.status(404).send({msg: 'Item not found.'});
	}
	
	reply.send(item);
};

const addItem = (req, reply) => {
	const { name } = req.body;
	const item = {
		id: uuidv4(),
		name: name
	};

	items = [...items, item];

	reply.code(201).send(item);

};

const deleteItem = (req, reply) => {
	const { id } = req.params;
	items = items.filter(item => item.id !== id);

	reply.code(200).send({ message: 'Item has been deleted.' });

};

const updateItem = (req, reply) => {
	const { id } = req.params;
	const { name } = req.body;
	items = items.map(item => item.id === id ? { id, name } : item);
	const item = items.find(item => item.id === id);

	reply.code(200).send(item);

};

module.exports = { getItems, getItem, addItem, deleteItem, updateItem };