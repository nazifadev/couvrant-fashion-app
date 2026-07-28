import { useState, useEffect } from "react"
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";

type ItemImage = {
    image_url: string;
    display_order: number;
}

type Product = {
    id: number;
    brand_name: string;
    name: string;
    price: number;
    product_url: string;
    item_images: ItemImage[];
}

type ProductGridProps = {
    search: string;
    category_id: number | null;
    brand: string;
    color: string;
    minPrice: number | null;
    maxPrice: number | null;
}

function ProductCard({ product }: { product: Product }) {    
    const [img_num, setImg_num] = useState(1)
    const displayImage = product.item_images.find((image: ItemImage) => image.display_order == img_num)
    return (
        <div >
            <div className= "relative " >
                <a  href={product.product_url}>
                   <img  src = {displayImage?.image_url ?? ""}
                    className= "rounded-2xl object-cover object-center w-full h-130  hover:-translate-y-5 transition-transform duration-400"/>
                </a> 

                <div className= "">
                    <button className=" w-10 h-10  flex  items-center justify-center absolute top-1/2 left-2 bg-transparent rounded-full hover:bg-[#C9A96E]  hover:text-[#000000] text-[#6B4F0A]/[0.50] active:bg-[#A07830] text-[12px] "   disabled={img_num==1} onClick={() => setImg_num(img_num - 1)} ><SlArrowLeft /></button>
                    <button  className =" w-10 h-10 flex  items-center justify-center  absolute top-1/2 right-2 bg-transparent rounded-full text-[12px] text-[#6B4F0A]/[0.50] hover:text-[#000000]  hover:bg-[#C9A96E] active:bg-[#A07830] " disabled={img_num==product.item_images.length} onClick={() => setImg_num(img_num + 1)}  ><SlArrowRight /></button>
                </div>
            </div>

            <div className= "pt-4  " >
                <p className="uppercase text-[12px]  tracking-[0.2em] text-[#A07830] "   >{product.brand_name}</p>
                <p className="pt-1 text-[15px] "                                         >{product.name}</p>
                <p className="pt-1 text-[14px] "                                         >${product.price.toFixed(2)}</p>
                <p className="pt-3 text-[12px] text-gray-500 hover:underline "                            ><a href={product.product_url}>View Link → </a>  </p>

            </div>
        </div>
    )
}

function ProductGrid({search, category_id, brand, color, minPrice, 
maxPrice}: ProductGridProps){
    
    const [products, setProducts] = useState<Product[]>([])
    const [pageNumber, setPageNumber] = useState(1)
    const [total, setTotal] = useState(0)

    async function fetchProducts() {
    const categoryParam = category_id !== null ? `&category_id=${category_id}` : ""
    const minPriceParam = minPrice !== null ? `&min_price=${minPrice}` : ""
    const maxPriceParam = maxPrice !== null ? `&max_price=${maxPrice}` : ""
    const result = await fetch(`${import.meta.env.VITE_API_URL}/items?page=${pageNumber}&limit=6&search=${search}&brand=${brand}&color=${color}${categoryParam}${minPriceParam}${maxPriceParam}`)    
        
    
     const data = await result.json()
        
        
        setProducts(data.items)
        setTotal(data.total)

    }
    useEffect( ()=> {fetchProducts()}, [pageNumber])
    useEffect(() => {
        if (pageNumber === 1) {
            fetchProducts()
        } else {
            setPageNumber(1)
        }
    }, [search, brand, color, category_id, minPrice, maxPrice])


    return(

        <section className = "max-w-[1440px] mx-auto px-6 md:px-16 pb-25">
            
            <p className="uppercase text-[#C07D1F] text-[12px] pt-10 tracking-[0.3em] open-sans-main" >Featured Pieces</p>

            <div className="grid pt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  w-full gap-13">
            {products.map(product => <ProductCard  key={product.id} product={product} />)}
            </div>

            <div className= "flex justify-between pt-20">
                <button className="bg-[#EBE1D0] rounded-full  px-5 py-3 text-[13px]  hover:bg-[#C9A96E] active:bg-[#C07D1F] active:text-[#FFFFFF] "       disabled={pageNumber==1}       onClick={() => setPageNumber(pageNumber - 1)}               >← previous</button>
                <button  className ="bg-[#EBE1D0]  rounded-full px-5 py-3 text-[13px]  hover:bg-[#C9A96E] active:bg-[#C07D1F] active:text-[#FFFFFF] "      disabled={pageNumber==(Math.ceil(total/6))}       onClick={() => setPageNumber(pageNumber + 1)}               >next →</button>
            </div>

        </section>
    )
}

export default ProductGrid