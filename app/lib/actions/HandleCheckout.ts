 
declare global {
  interface Window {
    Razorpay: any;
  }
}
 
export const handleCheckout = async (total: string,user:any) => {
    
  
  function loadScript(src:any) {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.async = true;

      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
        console.log('Failed to load Razorpay SDK')
      }
      document.body.appendChild(script)
    })
  }

     try {
       {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          method: "POST",
            body: JSON.stringify({ amount : total  }),
            headers:{
              'Content-Type': 'application/json',
             }

        });
        const order = await res.json();
        if(!order.id) throw new Error("Order creation failed");
         console.log(order.amount);

         const ress = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

      if (!ress){
        alert('Razropay failed to load!!')
        return 
      }
 
         const options= {
          
          "order_id": String(order.id), 
        "handler": function (response:any){
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature)
    },          
        
      
         
      };

          
        const razorpay = new window.Razorpay(options);
        razorpay.open()

         }
      

    } catch (err) {
      console.log("[checkout_POST]", err);
    }


 

  };

