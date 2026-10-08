import api from "@/lib/axios";
import { ProductsResponse } from "@/types/product";

export async function getProducts(
    limit: number,
    skip: number
): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>("/products", {
        params: {
            limit: limit,
            skip: skip,
        },
    });

    return response.data;
}