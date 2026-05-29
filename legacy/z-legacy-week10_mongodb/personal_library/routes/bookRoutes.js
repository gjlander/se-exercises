import { Router } from 'express';
import validateBody from '../middleware/validateBody.js';
import { bookSchema } from '../zod/schemas.js';

// import all the controllers
import { getAllBooks, getOneBook, createBook, updateBook, deleteOneBook } from '../controllers/books.js';

// create a new instance or express router
const bookRouter = Router();

// decide which controllers to execute on the specific actions
bookRouter.route('/').get(getAllBooks).post(validateBody(bookSchema), createBook);

bookRouter.route('/:id').get(getOneBook).put(validateBody(bookSchema), updateBook).delete(deleteOneBook);
//test
export default bookRouter;
