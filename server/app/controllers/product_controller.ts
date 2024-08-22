import { Request, Response } from 'express';
import ProductModel from '../models/product_model';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};