import express from 'express';
import ProductModel from '../models/product_model'; '../models/product_model';
import { getProducts } from '../controllers/product_controller';
const router = express.Router();

// GET /products
router.get('/products', async (req: express.Request, res: express.Response) => {
    try {
        // Call the product controller to get the products
        const products = await getProducts(req, res);

        // Send the products as the response
        res.json(products);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;