import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Rating from "../(components)/Rating";
import Image from "next/image";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="row-span-3 xl:row-span-6 glass-panel rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5 text-gray-200">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2 text-gray-800 dark:text-gray-100">
            Popular Products
          </h3>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="overflow-auto h-full">
            {dashboardMetrics?.popularProducts.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={`/product${Math.floor(Math.random() * 3) + 1}.png`}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="rounded-lg w-14 h-14"
                  />
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-black dark:text-gray-100">
                      {product.name}
                    </div>
                    <div className="flex text-sm items-center">
                      <span className="font-bold text-primary-600 text-xs">
                        ${product.price}
                      </span>
                      <span className="mx-2 text-gray-400">|</span>
                      <Rating rating={product.rating || 0} />
                    </div>
                  </div>
                </div>

                <div className="text-xs flex items-center text-gray-600 dark:text-gray-400">
                  <button className="p-2 rounded-full bg-primary-900/50 text-primary-400 mr-2 border border-primary-500/20">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {Math.round(product.stockQuantity / 1000)}k Sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
