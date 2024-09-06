import React, { useContext } from 'react';
import { RiShoppingBasketLine } from "react-icons/ri";
import { AuthContext } from '../../Context/AuthProvider';
import Swal from 'sweetalert2';
import useCart from '../../Hooks/useCart';
import { useNavigate } from 'react-router-dom';

const SingleProducts = ({ item }) => {
    
    const {user} = useContext(AuthContext)
    const [isPending, cart, refetch] = useCart()
    const navigate = useNavigate()

    const handleCart = () => {

        if (!user) {
            Swal.fire({
                title: 'Please Login First',
                icon: 'error',
            })
            navigate('/login')
            return
        }

        const cartItem = {
            item_id: item._id,
            name: item.name,
            price: item.discount_price,
            quantity: 1,
            image: item.image,
            email:user.email
        }

        fetch('https://furniflex-blush.vercel.app/cart' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItem)
        })
        .then((res) => res.json()) 
        .then((data) => {
            refetch()
            Swal.fire({
                title: 'Item added to cart!',
                icon:'success',
                confirmButtonText: 'Continue shopping',
            })
         })

    }

    return (
        <div className="card bg-base-100 shadow-xl flex flex-col">
            <figure className="px-4 pt-4">
                <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-xl w-[10rem] h-[10rem] object-fill"
                />
            </figure>

            <div className="card-body text-center p-4">
                <h2 className="card-title text-lg font-bold">{item.name}</h2>
                <p className="text-gray-600 mt-2">
                    <span className="text-xl font-semibold text-black">€{item.discount_price}</span>
                    <span className="line-through text-sm text-gray-400 ml-2">€{item.original_price}</span>
                    <span className="text-red-500 text-sm ml-2">{item.off_percentage}% OFF</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">{item.furniture_details}</p>
                <p className="text-yellow-500 font-medium mt-1">
                    Rating: {item.rating} ★
                </p>
                <div className="card-actions mt-4">
                    <button onClick={() => handleCart()} className="btn btn-neutral w-full flex items-center justify-center">
                        <RiShoppingBasketLine className="mr-2" /> Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleProducts;
