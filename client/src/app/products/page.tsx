"use client";

import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import CreateProductModal from "./CreateProductModal";
import Image from "next/image";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border border-gray-200 bg-white shadow-sm rounded dark:bg-gray-700 dark:border-gray-600">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2 dark:text-gray-200" />
          <input
            className="w-full py-2 px-4 rounded bg-white text-black placeholder-gray-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-white" /> Create
          Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="bg-white border border-gray-200 shadow-md rounded-2xl p-4 max-w-full w-full mx-auto dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex flex-col items-center">
                <div className="relative w-36 h-36 mb-3">
                  <Image
                    src={`/product${Math.floor(Math.random() * 3) + 1}.png`}
                    alt={product.name}
                    fill
                    className="rounded-2xl object-cover"
                  />
                </div>
                <h3 className="text-lg text-black font-semibold dark:text-white">
                  {product.name}
                </h3>
                <p className="text-black dark:text-gray-200">${product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-700 mt-1 dark:text-gray-400">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
