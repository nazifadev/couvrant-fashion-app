import NavBar from './NavBar'
import Hero from './Hero'
import ProductGrid from './ProductGrid'
import Footer from './Footer'
import FilterBar from './FilterBar'
import { useState} from "react"

function HomePage() {
  
  const [search, setSearch] = useState("")
  const [category_id, setCategoryId] = useState<number | null>(null)
  const [brand, setBrand] = useState("")
  const [color, setColor] = useState("")
  const [minPrice, setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [openFilter, setOpenFilter] = useState("")
  const [showingAll, setShowingAll] = useState(false)

  return (

    <div className = "bg-[#F5F0E8]">

    <NavBar search= {search} setSearch = {setSearch}  ></NavBar>
    <Hero></Hero>
    <FilterBar
    category_id = {category_id}
    setCategoryId = {setCategoryId}
    brand = {brand}
    setBrand = {setBrand}
    color = {color}
    setColor = {setColor}
    minPrice = {minPrice}
    setMinPrice = {setMinPrice}
    maxPrice = {maxPrice}
    setMaxPrice = {setMaxPrice}
    openFilter = {openFilter}
    setOpenFilter = {setOpenFilter}
    showingAll = {showingAll}
    setShowingAll = {setShowingAll}
    ></FilterBar>
    <ProductGrid 
    search= {search}
    category_id = {category_id}
    brand = {brand}
    color = {color}
    minPrice = {minPrice}
    maxPrice = {maxPrice}
    showingAll = {showingAll}
    ></ProductGrid>
    <Footer></Footer>

  </div>

  )
}

export default HomePage
