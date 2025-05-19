import { Breadcrumb } from "antd";
import Link from "next/link";

const Cart = () => {
    return (
        <div className="container mx-auto py-16 ">
            <Breadcrumb
                items={[
                    {
                        title: <Link href={`/`}>Home</Link>,
                    },
                    {
                        title: <Link href={`/cart`}>Cart</Link>,
                    },
                ]}
            />
            <div>
                
            </div>
        </div>
    );
};

export default Cart;