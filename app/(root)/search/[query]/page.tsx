 import { getSearchedProducts } from "@/app/lib/actions/actions";
import ProductCard from "../../components/ProductCard";
 
 

const SearchPage = async ({ params }: { params: { query: string }}) => {
  const searchedProducts = await getSearchedProducts(params.query)
   const decodedQuery = decodeURIComponent(params.query)

  return (

    <div className='px-10 py-5'>
      <p className='medium my-10'>Search results for {decodedQuery}:</p>
      {!searchedProducts || searchedProducts.length === 0 && (
        <p className='text-body-bold my-5'>No result found</p>
      )}
      <div className='flex flex-wrap justify-normal gap-2'>
        {searchedProducts?.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic";

export default SearchPage