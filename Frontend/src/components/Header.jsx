

/*
?   Custom modules
*/
import { useGetTopProductQuery } from "../redux/api/productSliceApi"
import SmallProduct from "../pages/Products/SmallProduct"
import Loader from "./Loader"
import ProductCarousel from "../pages/Products/ProductCarousel"
import Error from "./Error"


const Header = () => {
      const { data, isError, error, isLoading, refetch } = useGetTopProductQuery()

      if (isLoading) {
            return <Loader />
      }

      if (isError) {
            return <Error message={error?.data?.message || error?.error} />
      }


      return (
            <div className="flex justify-around lg:ml-[3rem] mt-4">
                  <div className="hidden xl:block">
                        <div className="grid grid-cols-2 gap-4">
                              {data.map((product) => (
                                    <div key={product._id}>
                                          <SmallProduct product={product} />
                                    </div>
                              ))}
                        </div>
                  </div>

                  <ProductCarousel />
            </div>
      )
}

export default Header