/**
 * Author: Zhack Ariya
 * Sample Item Routes
 */
const { getItems, getItem, addItem, deleteItem, updateItem } = require('../controllers/items');

// #region Objects
const Item = {
	type: 'object',
	properties: {
		id: { type: 'string' },
		name: { type: 'string' }
	}
};

const ItemId = {
	type: 'object',
	required: ['id'],
	properties: {
		id: {
			type: 'string',
			description: 'Item ID'
		},
	}
};

const ItemName = {
	type: 'object',
	required: ['name'],
	properties: {
		name: {
			type: 'string',
			description: 'item Name'
		},
	}
};
// #endregion

// #region Route Options
// Options for get all items
const getItemsOpts = {
	schema: {
		description: 'Get all items',
		tags: ['ITEMS'],
		response: {
			200: {
				description: 'Success',
				type: 'array',
				items: Item
			},
			404: {
				description: 'Not found',
				type: 'object',
				properties: {
					message: { type: 'string', default: 'Resource not found.' }
				}
			},
			401: {
				description: 'Unauthorized',
				type: 'object',
				properties: {
					message: { type: 'string', default: 'No authorization was found in headers.' }
				}
			}
		}
	},
	handler: getItems,
};

// Options for getting 1 item
const getItemOpts = {
	schema: {
		description: 'Get single item',
		tags: ['ITEMS'],
		params: ItemId,
		response: {
			200: Item,
			404: {
				type: 'object',
				properties: {
					message: { type: 'string' }
				}
			}
		}
	},
	handler: getItem
};

// Options for adding 1 item
const postItemOpts = {
	schema: {
		description: 'Add single item',
		tags: ['ITEMS'],
		body: ItemName,
		response: {
			201: Item,
		}
	},
	handler: addItem
};

// Options for deleting 1 item
const deleteItemOpts = {
	schema: {
		description: 'Delete single item',
		tags: ['ITEMS'],
		params: ItemId,
		response: {
			200: {
				type: 'object',
				properties: {
					message: { type: 'string' }
				}
			}
		}
	},
	handler: deleteItem,
};

// Options for updating 1 item
const updateItemOpts = {
	schema: {
		description: 'Update single item',
		tags: ['ITEMS'],
		params: ItemId,
		response: {
			200: Item
		}
	},
	handler: updateItem

};
// #endregion

// #region Routes
function itemRoutes(fastify, options, done) {

	// Get all items
	fastify.get('/items', { ...getItemsOpts, preValidation: [fastify.jwtauthentication] });
	done();

	// Get single items
	fastify.get('/items/:id', getItemOpts);
	done();

	// Add item
	fastify.post('/items', postItemOpts);
	done();

	// Delete item
	fastify.delete('/items/:id', deleteItemOpts);
	done();

	// Update item
	fastify.put('/items/:id', updateItemOpts);
	done();
}

module.exports = itemRoutes;

// #endregion