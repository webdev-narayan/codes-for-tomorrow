
type service_price_options = {
    duration: number,
    price: number;
    type: "Mothly" | "Weekly" | "Hourly"
}
type services = {
    service_name: string;
    type: "VIP" | "Normal";
    ServicePriceOptions: service_price_options[]
}
export interface createCategorySchema {
    category_name: string;
    services: services[]
}
