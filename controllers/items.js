/**
 * Author: Zhack Ariya
 * Sample Item Controllers
 */

// const { v4: uuidv4 } = require('uuid');


const getItems = (req, reply) => {
	reply.send([]);
};

const getItem = (req, reply) => {

	const { id } = req.params;
	const item = [].find((item) => item.id === id);
	if (!item) {
		reply.status(404).send({msg: 'Item not found.'});
	}
	
	reply.send(item);
};

const addItem = (req, reply) => {
	const { name } = req.body;
	const item = {
		name: name
	};
	

	//items = [...items, item];

	reply.code(201).send(item);

};

const deleteItem = (req, reply) => {
	const { id } = req.params;
	//items = items.filter(item => item.id !== id);

	reply.code(200).send({ message: `Item has been deleted.\n${id}` });

};

const updateItem = (req, reply) => {
	const { id } = req.params;
	const { name } = req.body;
	//items = items.map(item => item.id === id ? { id, name } : item);
	const item = {id,name};

	reply.code(200).send(item);

};

module.exports = { getItems, getItem, addItem, deleteItem, updateItem };