export class Product{
    id: number;
    name:string;
    model_no:string;
    image: string;
    description:string;
    specification:string;
    category_id: number;
    subcategory_id: number;
    brand_id: number;
    shop_id: number;
    created_at: string;
    updated_at: string;
    category: [];
    productdetail: [];
    brand: []
}