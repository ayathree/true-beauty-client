import { useLoaderData } from "react-router-dom";


const BrandProducts = () => {
    const products= useLoaderData()
    console.log(products)
    return (
        <div>
            <p>hi</p>
        </div>
    );
};

export default BrandProducts;