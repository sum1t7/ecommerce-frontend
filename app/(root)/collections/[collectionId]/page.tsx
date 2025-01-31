 import { getCollectionDetails } from '@/app/lib/actions/actions'
import Image from 'next/image'
import React from 'react'
import ProductList from '../../components/ProductList'
import CollectionProducts from '../../components/CollectionProducts'

const CollectionDetails = async ({params}:{params : {collectionId:string}}) => {
    const collection = await getCollectionDetails(params.collectionId)
   return (
    <>
    <div className="relative">
    <div className=" ">
           <Image
             src= {collection.image}
             alt="banner"
             width={2000}
             height={1000}
             className="w-screen "
             />
        </div>
           <div className="absolute inset-0 flex items-center justify-center">
             <p className="lg:raleway-extralight large text-white text-5xl  ">
                {collection.description}
         </p>
           </div>
         </div>
         <CollectionProducts collectionId={collection._id} />
             </>
  )
}

export default CollectionDetails