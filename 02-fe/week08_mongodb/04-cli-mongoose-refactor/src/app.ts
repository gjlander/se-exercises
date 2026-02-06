import { Command } from 'commander';
import type { ProductType } from '#types';
import '#db';
import { Product } from '#models';

const program = new Command();
program
	.name('ecommerce-cli')
	.description('Simple product CRUD CLI')
	.version('1.0.0');

// CREATE
program
	.command('add')
	.description('Add a new product')
	.argument('<name>', 'Product name')
	.argument('<stock>', 'Stock quantity')
	.argument('<price>', 'Product price')
	.argument('[tags]', 'Comma-separated tags')
	.action(async (name, stockStr, priceStr, tagsStr) => {
		console.log('CLI application was called with add command with arguments:', {
			name,
			stockStr,
			priceStr,
			tagsStr
		});
		const stock = +stockStr;
		const price = +priceStr;
		const tags = tagsStr?.split(',');

		console.log(tags);
		const newProduct = await Product.create({
			name,
			stock,
			price,
			tags
		} satisfies ProductType);
		console.log(`New product: ${newProduct}`);

		// console.log(`${name} inserted with ID of ${}`);
	});

// READ - List all products
program
	.command('list')
	.description('List all products')
	.action(async () => {
		console.log('CLI application was called with list command');
		const products = await Product.find();
		console.log(products);
	});

// // READ - Get product by id
program
	.command('get')
	.description('Get product by ID')
	.argument('<id>', 'Product ID')
	.action(async (id) => {
		console.log('CLI application was called with get command');
		const products = await Product.findById(id);
		console.log(products);
	});

// // SEARCH - search by tags
program
	.command('search')
	.description('Search products by tag')
	.argument('<tag>', 'Product tag')
	.action(async (tag) => {
		console.log('CLI application was called with search command');

		const products = await Product.find({ tags: tag });
		console.log(products);
	});

// // UPDATE
program
	.command('update')
	.description('Update a product by ID')
	.argument('<id>', 'Product ID')
	.argument('<name>', 'Product name')
	.argument('<stock>', 'Stock quantity')
	.argument('<price>', 'Product price')
	.argument('<tags>', 'Comma-separated tags')
	.action(async (id, name, stockStr, priceStr, tagsStr) => {
		console.log(
			'CLI application was called with update command with arguments:',
			{
				id,
				name,
				stockStr,
				priceStr,
				tagsStr
			}
		);
		const stock = +stockStr;
		const price = +priceStr;
		const tags = tagsStr.split(',');

		const result = await Product.findByIdAndUpdate(
			id,
			{
				name,
				stock,
				price,
				tags
			} satisfies Required<ProductType>,
			{ new: true }
		);
		console.log(result);

		// console.log(`${name} inserted with ID of ${}`);
	});

// // DELETE - delete product by id
program
	.command('delete')
	.description('Delete product by ID')
	.argument('<id>', 'Product ID')
	.action(async (id) => {
		console.log('CLI application was called with delete command');

		await Product.findByIdAndDelete(id);
		console.log(`Product deleted with id: ${id}`);
	});

// after all commands
program.hook('postAction', () => process.exit(0));
program.parse();
