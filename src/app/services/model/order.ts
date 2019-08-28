export class Order {
    id: number;
    customer_id: number;
    sub_total: number;
    total: number;
    shipping_id: number;
    created_at: string;
    updated_at: string;
    orderdetail: []
}
