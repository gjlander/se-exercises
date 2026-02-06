import '#db';
import { Product } from '#models';
import type { ProductType } from '#types';

try {
	const products = await Product.find();
	if (!products.length) console.log('No products found');
	for (const product of products) {
		console.log(`Product: ${product.name}, Price: ${product.price}, Stock: ${product.stock}`);
	}
} catch (error: unknown) {
	if (error instanceof Error) {
		console.error('\x1b[31mSomething went wrong', error.message, '\x1b[0m');
	} else {
		console.error('\x1b[31mAn unknown error occurred\x1b[0m');
	}
}

// try {
// 	const newProduct = await Product.create<ProductType>({
// 		name: 'Sample Product',
// 		price: 19.99,
// 		stock: 100,
// 		tags: ['electronics', 'gadgets']
// 	});
// 	console.log(newProduct);
// } catch (error: unknown) {
// 	if (error instanceof Error) {
// 		console.error('\\x1b[31mSomething went wrong', error.message, '\\x1b[0m');
// 	} else {
// 		console.error('\\x1b[31mAn unknown error occurred\\x1b[0m');
// 	}
// }
