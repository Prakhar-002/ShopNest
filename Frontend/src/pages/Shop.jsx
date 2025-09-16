

/*
?   Node modules
*/

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'


/*
?   Custom modules
*/
import { useGetFilteredProductsQuery } from "../redux/api/productSliceApi"
import {
      setCategories,
      setProducts,
      setChecked
} from "../redux/features/shop/shopSllice"
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice"
import ProductCard from "./Products/ProductCard"
import noProductPng from '../assets/No-Product.png';
import { Link } from "react-router"

const Shop = () => {
      const dispatch = useDispatch();
      const { categories, products, checked, radio } = useSelector(
            (state) => state.shop
      );

      const categoriesQuery = useFetchCategoriesQuery();
      const [priceFilter, setPriceFilter] = useState("");

      const filteredProductsQuery = useGetFilteredProductsQuery({
            checked,
            radio,
      });

      useEffect(() => {
            if (!categoriesQuery.isLoading) {
                  dispatch(setCategories(categoriesQuery.data));
            }
      }, [categoriesQuery.data, dispatch]);

      useEffect(() => {
            if (!checked.length || !radio.length) {
                  if (!filteredProductsQuery.isLoading) {
                        // Filter products based on both checked categories and price filter
                        const filteredProducts = filteredProductsQuery.data.filter(
                              (product) => {
                                    // Check if the product price includes the entered price filter value
                                    return (
                                          product.price.toString().includes(priceFilter) ||
                                          product.price === parseInt(priceFilter, 10)
                                    );
                              }
                        );

                        dispatch(setProducts(filteredProducts));
                  }
            }
      }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

      const handleBrandClick = (brand) => {
            const productsByBrand = filteredProductsQuery.data?.filter(
                  (product) => product.brand === brand
            );

            dispatch(setProducts(productsByBrand));
      };

      const handleCheck = (value, id) => {
            const updatedChecked = value
                  ? [...checked, id]
                  : checked.filter((c) => c !== id);

            dispatch(setChecked(updatedChecked));
      };

      // Add "All Brands" option to uniqueBrands
      const uniqueBrands = [
            ...Array.from(
                  new Set(
                        filteredProductsQuery.data
                              ?.map((product) => product.brand)
                              .filter((brand) => brand !== undefined)
                  )
            ),
      ];

      const handlePriceChange = (e) => {
            // Update the price filter state when the user types in the input filed
            setPriceFilter(e.target.value);
      };

      return (
            <>
                  <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:ml-[3.5rem] md:flex-row gap-4">

                              {/* Sidebar Filters */}
                              <div className="bg-[#151515] rounded-xl p-4 w-full md:w-[17rem] shadow-xl">

                                    {/* Category Filter */}
                                    <h2 className="text-white text-lg font-semibold text-center bg-black py-2 rounded-full mb-4">
                                          Filter by Categories
                                    </h2>

                                    <div className="space-y-3 mb-6">
                                          {categories?.map((c) => (
                                                <label key={c._id} className="flex items-center cursor-pointer">
                                                      <input
                                                            type="checkbox"
                                                            onChange={(e) => handleCheck(e.target.checked, c._id)}
                                                            className="mr-2 w-4 h-4 text-pink-600 bg-gray-700 border-gray-600 rounded focus:ring-pink-500 focus:ring-2 accent-pink-500"
                                                      />
                                                      <span className="text-sm text-[#d1d5db]">{c.name}</span>
                                                </label>
                                          ))}
                                    </div>

                                    {/* Brand Filter */}
                                    <h2 className="text-white text-lg font-semibold text-center bg-black py-2 rounded-full mb-4">
                                          Filter by Brands
                                    </h2>

                                    <div className="space-y-3 mb-6">
                                          {uniqueBrands?.map((brand) => (
                                                <label key={brand} className="flex items-center cursor-pointer">
                                                      <input
                                                            type="radio"
                                                            name="brand"
                                                            onChange={() => handleBrandClick(brand)}
                                                            className="mr-2 w-4 h-4 text-pink-500 bg-gray-700 border-gray-600 focus:ring-pink-500 focus:ring-2 accent-pink-500"
                                                      />
                                                      <span className="text-sm text-[#d1d5db]">{brand}</span>
                                                </label>
                                          ))}
                                    </div>

                                    {/* Price Filter */}
                                    <h2 className="text-white text-lg font-semibold text-center bg-black py-2 rounded-full mb-4">
                                          Filter by Price
                                    </h2>

                                    <div className="mb-4">
                                          <input
                                                type="text"
                                                placeholder="Enter Price"
                                                value={priceFilter}
                                                onChange={handlePriceChange}
                                                className="w-full px-4 py-2 text-sm bg-[#1f1f1f] text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                          />
                                    </div>

                                    {/* Reset Button */}
                                    <button
                                          onClick={() => window.location.reload()}
                                          className="w-full bg-transparent text-white border border-pink-600 hover:bg-pink-600 transition-all duration-300 rounded-lg py-2 font-medium"
                                    >
                                          Reset Filters
                                    </button>

                                    <Link
                                          to='/cart'
                                    >
                                          <button
                                                className="w-full mt-2 bg-transparent text-white border border-rose-600 hover:bg-rose-600 transition-all duration-300 rounded-lg py-2 font-medium"
                                          >
                                                Go To Cart
                                          </button>
                                    </Link>
                              </div>


                              {/* Products Display */}
                              <div className="flex-1 p-4">
                                    <h2 className="text-2xl font-semibold text-[#fce4ec] mb-6 text-center tracking-wide">
                                          <span className="text-[#f8bbd0]">({products?.length})</span> Products Found
                                    </h2>

                                    <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                                          {products.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center w-full mt-10 text-center">
                                                      <p className="text-white text-lg mb-4">
                                                            No products found. Try changing filters.
                                                      </p>
                                                      <img
                                                            src={noProductPng}
                                                            alt="No Products"
                                                            loading="lazy"
                                                            className="w-64 h-auto opacity-80"
                                                      />
                                                </div>
                                          ) : (
                                                products?.map((p) => (
                                                      <div key={p._id} className="w-[16rem]">
                                                            <ProductCard p={p} />
                                                      </div>
                                                ))
                                          )}
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      )

}

export default Shop