import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useCart = () => {

    const { user } = useContext(AuthContext);

    const { isPending, refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
           
            if (!user?.email) {
                return [];
            }

            const res = await fetch(`https://furniflex-blush.vercel.app/cart?email=${user.email}`);

            return res.json();
        },
      
    });

    return [isPending, cart, refetch];
};

export default useCart;
