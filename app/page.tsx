"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import { Product } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");
  const pageFromUrl = Number(pageParam) || 1;

  const pageSizeParam = searchParams.get("pageSize");
  const pageSizeFromUrl = Number(pageSizeParam) || 10;

  // Products currently displayed in the table
  const [products, setProducts] = useState<Product[]>([]);

  // Total number of products available from the API
  const [total, setTotal] = useState(0);

  // Number of products shown on each page
  const [limit, setLimit] = useState(pageSizeFromUrl);

  // Number of products to skip
  const [skip, setSkip] = useState((pageFromUrl - 1) * limit);

  useEffect(() => {
    setSkip((pageFromUrl - 1) * limit);
  }, [pageFromUrl, limit]);

  // Fetch products whenever skip or limit changes
  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts(limit, skip);

      setProducts(data.products);
      setTotal(data.total);
    }

    loadProducts();
  }, [skip, limit]);

  // Calculate current page number
  const currentPage = skip / limit + 1;

  // Calculate total number of pages
  const totalPages = Math.ceil(total / limit);

  // Create page numbers: 1, 2, 3, 4...
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Product Admin Dashboard
      </h1>

      <p className="mb-4 text-gray-600">
        Manage products with pagination and page-size controls.
      </p>

      {/* Showing products information */}
      <p className="mb-4">
        Showing {total === 0 ? 0 : skip + 1}–
        {Math.min(skip + limit, total)} of {total}
      </p>

      {/* Page size selector */}
      <div className="mb-4">
        <label htmlFor="pageSize" className="mr-2">
          Page Size:
        </label>

        <select
          id="pageSize"
          value={limit}
          onChange={(event) => {
            const newLimit = Number(event.target.value);

            setLimit(newLimit);

            router.push(`?page=1&pageSize=${newLimit}`);
          }}
          className="rounded border px-3 py-2"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      {/* Product table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">
                Image
              </th>

              <th className="border px-4 py-2 text-left">
                Title
              </th>

              <th className="border px-4 py-2 text-left">
                Category
              </th>

              <th className="border px-4 py-2 text-left">
                Price
              </th>

              <th className="border px-4 py-2 text-left">
                Rating
              </th>

              <th className="border px-4 py-2 text-left">
                Stock
              </th>
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

      {/* Pagination */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {/* Previous button */}
        <button
          onClick={() => {
            router.push(`?page=${currentPage - 1}&pageSize=${limit}`);
          }}
          disabled={skip === 0}
          className="rounded bg-gray-500 px-4 py-2 text-white disabled:opacity-50"
        >
          Previous
        </button>

        {/* Page numbers */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => {
              router.push(`?page=${page}&pageSize=${limit}`);
            }}
            className={`rounded border px-3 py-2 ${currentPage === page
              ? "bg-blue-500 text-white"
              : ""
              }`}
          >
            {page}
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={() => {
            router.push(`?page=${currentPage + 1}&pageSize=${limit}`);
          }}
          disabled={skip + limit >= total}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}