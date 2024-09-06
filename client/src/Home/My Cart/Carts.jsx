import React, { useContext } from 'react';
import useCart from '../../Hooks/useCart';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthProvider';

const Carts = () => {
  const [isPending, cart, refetch] = useCart();
  const {user} = useContext(AuthContext)



  let total = 0;

  cart.map((item) => {
    total += item.price * item.quantity;
  })

  let tax = total * 0.05;


  const handlePlus = (id) => {
    fetch(`https://furniflex-blush.vercel.app/cart/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ method: 'increase' })
    })
      .then(res => res.json())
      .then(data => {
        refetch();
      })
  }

  const handleMinus = (id) => {
    fetch(`https://furniflex-blush.vercel.app/cart/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ method: 'decrease' })
    })
      .then(res => res.json())
      .then(data => {
        refetch();
      })
  }
  
  const handleDelete = (id) => {


    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {


        fetch(`https://furniflex-blush.vercel.app/cart/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(res => res.json())
          .then(data => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
  
            refetch();
          })
      }
    });


  }

  const handleCheckout = () => { 

     if ( cart.length === 0) {
      return Swal.fire({
        title: "Cart is Empty",
        text: "Add some items to the cart",
        icon: "error"
      });
     }

    const items = {
      products: cart.map((item) => item.name),
      images: cart.map((item) => item.image),
      email : user.email,
      price: total + tax
    }

    fetch('https://furniflex-blush.vercel.app/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(items)
    })
      .then(res => res.json())
      .then(data => {
        fetch(`https://furniflex-blush.vercel.app/cart/all`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: user.email})
        })
        
          .then(res => res.json())
          .then(() => {
            Swal.fire({
              title: "Order Placed!",
              text: "Check Payment History for more details",
              icon: "success"
            });
            refetch();  
          });
        
      })
  }


  return (
    <div className='flex flex-col lg:flex-row gap-6 '>
      <div className='lg:w-2/3'>
        <h1 className='font-abc text-center mt-4 text-xl lg:text-3xl font-semibold mb-4'>An overview of your order</h1>
 
        <div>
          {
            cart.map((item) => {
              return (
                <div key={item._id} className='flex justify-between px-6 py-4 border rounded-md bg-[#fffbfb]'>

                  <div className='flex items-center'>
                    <div>
                      <div className='flex gap-2 items-center px-2 py-1 border mr-4 rounded-lg bg-white text-2xl'>
                        <button className='text-red-500 font-extrabold'onClick={() => handleMinus(item._id)} >-</button>
                        <p className='font-medium'>{item.quantity}</p>
                        <button className='text-green-500 font-extrabold' onClick={() => handlePlus(item._id)}>+</button>
                      </div>
                    </div>
                    <img src={item.image} className='lg:w-[5.5rem] lg:h-[5.5rem] w-[3rem]' alt="" />
                    <p className='hidden lg:block font-abc'>{item.name}</p>
                  </div>


                  <div className='flex flex-col justify-between'>
                    <button className=' btn btn-ghost text-red-500 text-lg ' onClick={() => handleDelete(item._id) } >x</button>
                    <p className='font-semibold text-xl'>€ {item.price}</p>
                  </div>

                </div>
              )
            })
          }
        </div>

      </div>

      {/* Order Details Section */}
      <div className="lg:w-1/3 w-full lg:mt-16 bg-[#fffbfb] p-6 rounded-md shadow-sm">
        <h1 className="font-abc text-3xl font-semibold mb-4">Order details</h1>

        {/* Order Summary */}
        <div className="space-y-2 text-lg">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p> {total}€ </p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between">
            <p>Estimated Tax (5%)</p>
            <p>+{tax}€ </p>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4">
            <p>Total</p>
            <p>€ {total + tax}</p>
          </div>

          {/* Checkout Button */}
          <button onClick={handleCheckout}  className="w-full bg-black text-white py-2 rounded mt-4">
            Go to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carts;
