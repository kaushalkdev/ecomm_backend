import mongoose, { Schema, Document } from 'mongoose';

export interface ProductModel {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    brand: string;
    rating: number;
    reviews: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface ProductDocument extends Document {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    brand: string;
    rating: number;
    reviews: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

const ProductModel = mongoose.model<ProductDocument>('Product', ProductSchema);

export default ProductModel;