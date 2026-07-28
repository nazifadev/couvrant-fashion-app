import { useState, useEffect } from "react"

   type FilterBarProps = {
    category_id: number | null;
    setCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
    brand: string;
    setBrand: React.Dispatch<React.SetStateAction<string>>;
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
    minPrice: number | null;
    setMinPrice: React.Dispatch<React.SetStateAction<number | null>>;
    maxPrice: number | null;
    setMaxPrice: React.Dispatch<React.SetStateAction<number | null>>;
    openFilter: string;
    setOpenFilter: React.Dispatch<React.SetStateAction<string>>;
}



function FilterBar({ category_id, setCategoryId, brand, setBrand, color, setColor, minPrice, setMinPrice, 
maxPrice, setMaxPrice, openFilter, setOpenFilter }: FilterBarProps){

    const [brands, setBrands] = useState<string[]>([])

    useEffect(() => {
        async function fetchBrands() {
            const result = await fetch(`${import.meta.env.VITE_API_URL}/brands`)
            const data = await result.json()
            setBrands(data)
        }
        fetchBrands()
    }, [])

    const [colors, setColors] = useState<string[]>([])

    useEffect(() => {
        async function fetchColors() {
            const result = await fetch(`${import.meta.env.VITE_API_URL}/colors`)
            const data = await result.json()
            setColors(data)
        }
        fetchColors()
    }, [])

const [categories, setCategories] = useState<{id: number, name: string}[]>([])
 
    useEffect(() => {
        async function fetchCategories() {
            const result = await fetch(`${import.meta.env.VITE_API_URL}/categories`)
            const data = await result.json()
            setCategories(data)
        }
        fetchCategories()
    }, [])
    
    return(
    <div className="flex-col  ">

        <div className= "flex gap-4 md:gap-5 lg:gap-6 gap-2 flex-wrap w-full p-4 md:p-6 lg:p-8 p-3  justify-center  ">
            <button 
               className={openFilter === "category" ? "py-2 px-3 sm:py-2.5 px-4 md:py-2.5 md:px-4 text-[#A07830] border-[#A07830] items-center justify-center flex rounded-full border text-[12px] sm:text-[13px] md:text-[13px] transition-colors" : "py-2 px-3 sm:py-2.5 sm:px-4 md:py-2.5 md:px-4 text-[#000000]/[0.80] items-center justify-center flex rounded-full border border-black/15 text-[12px] sm:text-[13px] md:text-[13px] hover:text-[#A07830] hover:border-[#A07830] transition-colors"} 
                onClick={() => setOpenFilter(openFilter === "category" ? "" : "category")}  >
            Category ↓
            </button>

            <button 
            className={openFilter === "price" ? "py-2 px-3 sm:py-2.5 px-4 md:py-2.5 md:px-4 text-[#A07830] border-[#A07830] items-center justify-center flex rounded-full border text-[12px] sm:text-[13px] md:text-[13px] transition-colors" : "py-2 px-3 sm:py-2.5 sm:px-4 md:py-2.5 md:px-4 text-[#000000]/[0.80] items-center justify-center flex rounded-full border border-black/15 text-[12px] sm:text-[13px] md:text-[13px] hover:text-[#A07830] hover:border-[#A07830] transition-colors"} 
            onClick={() => setOpenFilter(openFilter === "price" ? "" : "price")} >
            Price ↓
            </button>

            <button 
            className={openFilter === "color" ? "py-2 px-3 sm:py-2.5 px-4 md:py-2.5 md:px-4 text-[#A07830] border-[#A07830] items-center justify-center flex rounded-full border text-[12px] sm:text-[13px] md:text-[13px] transition-colors" : "py-2 px-3 sm:py-2.5 sm:px-4 md:py-2.5 md:px-4 text-[#000000]/[0.80] items-center justify-center flex rounded-full border border-black/15 text-[12px] sm:text-[13px] md:text-[13px] hover:text-[#A07830] hover:border-[#A07830] transition-colors"} 
            onClick={() => setOpenFilter(openFilter === "color" ? "" : "color")} >
            Color ↓
            </button>

            <button 
            className={openFilter === "brand" ? "py-2 px-3 sm:py-2.5 px-4 md:py-2.5 md:px-4 text-[#A07830] border-[#A07830] items-center justify-center flex rounded-full border text-[12px] sm:text-[13px] md:text-[13px] transition-colors" : "py-2 px-3 sm:py-2.5 sm:px-4 md:py-2.5 md:px-4 text-[#000000]/[0.80] items-center justify-center flex rounded-full border border-black/15 text-[12px] sm:text-[13px] md:text-[13px] hover:text-[#A07830] hover:border-[#A07830] transition-colors"} 
            onClick={() => setOpenFilter(openFilter === "brand" ? "" : "brand")} >
            Brand ↓
            </button>
        </div>


        {/* if condition is true, show this, else show nothing */}
        {openFilter === "brand" && (
            <div className="flex-col text-[13px] ">
                <div className="border-b-1  md:border-b-1 border-[#000000]/[0.10] w-full "></div>
                <div className="flex gap-4 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-10 py-4  md:py-7 justify-center text-[#000000]/[0.80] flex-wrap  ">
                  {brands.map(b => (
                <button key={b} onClick={() => setBrand(b)} className={b === brand ? "underline text-[#A07830]" : "hover:text-[#A07830]"}>{b}</button>
                ))}
                <button onClick={() => setBrand("")} className="hover:text-[#A07830] ">All Brands</button>
                </div>
            </div>
        )}

        {openFilter === "category" && (
            <div className="flex-col text-[13px] ">
                <div className="border-b-1  md:border-b-1 border-[#000000]/[0.10] w-full "></div>
                <div className="flex gap-4 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-10 py-4 sm:py-5 md:py-7 justify-center text-[#000000]/[0.80] flex-wrap  ">
                   {categories.map(cat => (
                    <button key={cat.id} onClick={() => setCategoryId(cat.id)} className={cat.id === category_id ? "underline text-[#A07830]" : "hover:text-[#A07830]"}>{cat.name}</button>
                    ))}
                </div>
            </div>
        )}

        {openFilter === "color" && (
            <div className="flex-col text-[13px] ">
                <div className="border-b-1  md:border-b-1 border-[#000000]/[0.10] w-full  "></div>
                <div className="flex gap-4 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-10 py-4 sm:py-5 md:py-7 justify-center text-[#000000]/[0.80] flex-wrap  ">
                  {colors.map(c => (
                    <button key={c} onClick={() => setColor(c)} className={c === color ? "underline text-[#A07830]" : "hover:text-[#A07830]"}>{c}</button>
                 ))}
                <button onClick={() => setColor("")} className="hover:text-[#A07830] ">All Colors</button>
                </div>
            </div>
        )}

        {openFilter === "price" && (
            <div className="flex-col text-[13px] ">
            <div className="border-b-1  md:border-b-1 border-[#000000]/[0.10] w-full "></div>
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-4 px-4 sm:px-6 md:px-10 py-4 sm:py-5 md:py-7 justify-center items-center text-[#000000]/[0.80]">
                <input
                    type="number"
                    placeholder="Min"
                    value={minPrice ?? ""}
                    onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : null)}
                    className="border border-black/15 rounded-full px-3 sm:px-4 md:px-4 py-2 w-20 sm:w-24 md:w-24 text-center"
                />
                <span>to</span>
                <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice ?? ""}
                    onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
                    className="border border-black/15 rounded-full px-3 sm:px-4 md:px-4 py-2 w-20 sm:w-24 md:w-24 text-center"
                />
                <button onClick={() => setOpenFilter("")} className="hover:text-[#A07830]">Apply</button>
            </div>
        </div>
    )}


    {(brand || color || category_id !== null || minPrice !== null || maxPrice !== null) && (
        <div className="flex-col">
            <div className="border-b-1 md:border-b-1 border-[#000000]/[0.10] w-full"></div>
            <div className="flex gap-2 sm:gap-3 md:gap-3 px-4 sm:px-6 md:px-10 py-3 sm:py-4 md:py-4 items-center text-[12px] sm:text-[13px] md:text-[13px] text-[#000000]/[0.80] flex-wrap">
                <span>Applied:</span>

                {category_id !== null && (
                    <span className="bg-[#EBE1D0] rounded-full px-3 py-1 flex items-center gap-2">
                        Category: {categories.find(cat => cat.id === category_id)?.name}
                        <button onClick={() => setCategoryId(null)}>×</button>
                    </span>
                )}

                {(minPrice !== null || maxPrice !== null) && (
                    <span className="bg-[#EBE1D0] rounded-full px-3 py-1 flex items-center gap-2">
                        Price: ${minPrice ?? 0}–${maxPrice ?? "∞"}
                        <button onClick={() => {setMinPrice(null); setMaxPrice(null)}}>×</button>
                    </span>
                )}

                {color && (
                    <span className="bg-[#EBE1D0] rounded-full px-3 py-1 flex items-center gap-2">
                        Color: {color}
                        <button onClick={() => setColor("")}>×</button>
                    </span>
                )}

                {brand && (
                    <span className="bg-[#EBE1D0] rounded-full px-3 py-1 flex items-center gap-2">
                        Brand: {brand}
                        <button onClick={() => setBrand("")}>×</button>
                    </span>
                )}

                <button onClick={() => {setBrand(""); setColor(""); setCategoryId(null); setMinPrice(null); setMaxPrice(null)}} className="underline hover:text-[#A07830]">
                    Clear all
                </button>
            </div>
        </div>
)}

    <div className="border-b-1  md:border-b-1 border-[#000000]/[0.10] w-full"></div>

    </div>
    )
    
    }
export default FilterBar