import first_option from '../images/first_option.jpg'

function Hero(){


return(

<section id="home"  className = "flex flex-col justify-center items-center h-[400px] md:h-[500px] lg:h-[600px] " style={{ backgroundImage: `url(${first_option})`,  backgroundSize: 'cover' , backgroundRepeat: 'no-repeat', backgroundPosition : 'center 15%'}}>


    <div className="flex-col items-center justify-center">
        
        <h1  className =" text-[40px] text-center great-vibes-regular md:text-[50px] lg:text-[60px] text-[#F5F0E8] pt-20 px-15 md:px-13 tracking-wider    ">
            Modest Fashion, 
            All In One Place</h1>

            <p className = " text-[12px] md:text-[15px] text-center lg:text-[15px] pt-2 md:pt-2.5 px-15 md:px-13 open-sans-main text-[#F5F0E8] " >
                Discover curated pieces from your favorite brands
            </p>



            








    </div>

















</section>

)






}

export default Hero