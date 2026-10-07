"use client";

import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();

      setProducts(data.products);
    }

    loadProducts();
  }, []);

  return (
    <main>
      <h1>Product Admin Dashboard</h1>

      <p>Total products loaded: {products.length}</p>

      {products.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Image</th>
                <th className="border px-4 py-2 text-left">Title</th>
                <th className="border px-4 py-2 text-left">Category</th>
                <th className="border px-4 py-2 text-left">Price</th>
                <th className="border px-4 py-2 text-left">Rating</th>
                <th className="border px-4 py-2 text-left">Stock</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-12 w-12 object-cover"
                    />
                  </td>

                  <td className="border px-4 py-2">
                    {product.title}
                  </td>

                  <td className="border px-4 py-2">
                    {product.category}
                  </td>

                  <td className="border px-4 py-2">
                    ${product.price}
                  </td>

                  <td className="border px-4 py-2">
                    {product.rating}
                  </td>

                  <td className="border px-4 py-2">
                    {product.stock}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}