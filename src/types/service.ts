type service_price_options = {
    duration: number,
    price: number;
    type: "Monthly" | "Weekly" | "Hourly"
}
export interface createServiceSchema {
    service_name: string;
    type: "VIP" | "Normal";
    servicePriceOptions: service_price_options[];
    CategoryId: number;
}