import api from "@/lib/axios";
import { ProductsResponse } from "@/types/product";

export async function getProducts(): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>("/products");

    return response.data;
}