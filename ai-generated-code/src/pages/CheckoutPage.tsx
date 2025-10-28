import { useContext } from 'react';
    import PageTransitionWrapper from '@/components/animation/PageTransitionWrapper';
    import { GlobalStateContext } from '@/state/GlobalStateContext';
    import { Link, Navigate } from 'react-router-dom';
    
    const CheckoutPage = () => {
        const { state, dispatch } = useContext(GlobalStateContext);
        
        if (state.cart.length === 0) {
            return <Navigate to="/catalog" replace />;
        }

        const subtotal = state.cart.reduce((sum, item) => sum + item.price, 0);
        const taxes = subtotal * 0.08; // 8% tax
        const total = subtotal + taxes;

        const handlePlaceOrder = () => {
            alert('Thank you for your order!');
            dispatch({ type: 'CLEAR_CART' });
        }
    
      return (
        <PageTransitionWrapper>
          <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-black text-center mb-12">Your Order</h1>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                {state.cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center border-b py-4">
                        <div>
                            <p className="font-bold text-lg">{item.name}</p>
                            <p className="text-sm text-gray-500">Custom Configuration</p>
                        </div>
                        <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                    </div>
                ))}

                <div className="mt-8 space-y-2">
                    <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Taxes</p>
                        <p>${taxes.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4">
                        <p>Total</p>
                        <p>${total.toFixed(2)}</p>
                    </div>
                </div>

                <button 
                    onClick={handlePlaceOrder}
                    className="w-full mt-8 px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-transform hover:scale-105"
                >
                    Place Order
                </button>
            </div>
          </div>
        </PageTransitionWrapper>
      );
    };
    
    export default CheckoutPage;