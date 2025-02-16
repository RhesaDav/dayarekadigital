interface Transaction {
    transaction_id: number;
    total_amount:   string;
    created_at:     Date;
    customer_name:  string;
    products: {
        product_id:   number;
        product_name: string;
        quantity:     number;
        price:        number;
  }[];
}