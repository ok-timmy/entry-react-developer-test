import { PaystackButton } from "react-paystack";
import React from 'react'
import { useDispatch } from "react-redux";
import { cartActions } from "../Store/Cart-slice";
import { useNavigate } from 'react-router-dom';

const Paystack = ({email, name, contact, cartPrice}) => {

  const dispatch = useDispatch();
 const navigate = useNavigate();

  const emptyCart = () => {
    dispatch(
      cartActions.emptyCart({
        itemsList:  [],
        totalQuantity: 0,
        totalPrices: [],
        totalCartPrice: [],
      })
    );
  };


    const auth = {
        email,
        name,
        contact
      };
      const price = cartPrice;
      const publicKey = "pk_test_55dcbb1a73f71de36dafc94c1f8c9211517a1b5b";
    
      const componentProps = {
        email: auth.email,
        amount : Math.ceil(price),
        metadata: {
          userName: `${name.firstName} ${name.lastName}`,
          phone: `${contact.contact1} ${contact.contact2}`,
          custom_field: [{ foo: "bar" }]
        },
        publicKey,
        text: "Pay Now",
        onSuccess: (e) => {
          console.log(e);
          emptyCart();
          navigate('/');

        },
        onClose: () => {
          alert("Wait! You need this oil, don't go!!!!");
        }
      };

  return (
    <div><PaystackButton {...componentProps} /></div>
  )
}

export default Paystack