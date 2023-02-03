import React, { useEffect, useState } from 'react'
import './QRScanner.css';


// CURRENTLY WORKING ON SETTING UP ABILITY TO PASS ITEMS THAT ARE SCANNED / A BUTTON TO PASS ITEMS MANUALLY IF NO UPC




const mockOrders = [
    {
        order_id: 'TT1',
        order_products: [
            {
                product_id: 'ABC123',
                total_quantity: 25,
                quantity_passed: 0,
                passed: false
            }
        ],
        completed: false
    },
    {
        order_id: 'TT2',
        order_products: [
            {
                product_id: 'DEF456',
                total_quantity: 50,
                quantity_passed: 50,
                passed: true
            }
        ],
        completed: true
    },
    {
        order_id: 'TT3',
        order_products: [
            {
                product_id: 'ABC123',
                total_quantity: 25,
                quantity_passed: 0,
                passed: false
            },
            {
                product_id: 'HIJ789',
                total_quantity: 100,
                quantity_passed: 50,
                passed: false
            },
            {
                product_id: 'DEF456',
                total_quantity: 50,
                quantity_passed: 50,
                passed: true
            }
        ],
        completed: false
    },
    {
        order_id: 'TT4',
        order_products: [
            {
                product_id: 'ABC123',
                total_quantity: 25,
                quantity_passed: 0,
                passed: false
            },
            {
                product_id: 'HIJ789',
                total_quantity: 25,
                quantity_passed: 0,
                passed: false
            },
            {
                product_id: 'DEF456',
                total_quantity: 25,
                quantity_passed: 0,
                passed: false
            }
        ],
        completed: false
    },

];




const ObjectTest = {
    1: {
        id: 1,
        name: 'ABC'
    },
    3: {
        id: 3,
        name: 'DEF'
    }
}



const mockProducts = [
    {
        product_id: 'ABC123'
    },
    {
        product_id: 'DEF456'
    },
    {
        product_id: 'HIJ789'
    }
];






const QRScanner = () => {

    //     useEffect(() => {
    //         document.addEventListener('keydown', onScan, true)
    //     }, [])


    //     const onScan = event => {
    //         if (event.keyCode === 13) {
    //             console.log('pressed enter')
    //         }
    //         else {
    //             console.log(event.key)
    //         }
    //     }


    const upc_or_order_checker = () => {

    }








    const [orders, setOrders] = useState(mockOrders);
    const [curOrderExists, setCurOrderExists] = useState(false);
    const [currentOrder, setCurrentOrder] = useState({
        order_id: '',
        order_products: [

        ],
        completed: false
    },);
    const [form, setForm] = useState({
        upc: '',
        order_id: '',
        quantity: 1,
        order_produts: [{}]
    });


    const handleChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });

    };

    const handleKeyDown = event => {

        if (event.key === 'Enter' && event.target.name === 'order_id') {

            const checkerOrder = orders.find(item => item.order_id === form.order_id)
            setCurrentOrder(checkerOrder);
            if (checkerOrder) {
                setCurOrderExists(true)
            }
            else {
                setCurOrderExists(false)
            }

        }
        else if (event.key === 'Enter' && event.target.name === 'upc') {
            const checkerProduct = mockProducts.find(item => item.product_id === form.upc)

            if (checkerProduct) {

                for (let i = 0; i < currentOrder.order_products.length; i++) {

                    if (currentOrder.order_products[i].product_id === form.upc && currentOrder.order_products[i].total_quantity >= form.quantity) {
                        changeProduct(i, currentOrder.order_products[i].total_quantity);

                        break;
                    }
                    else if(currentOrder.order_products[i].total_quantity < form.quantity){
                        console.log('BAD QUANTITY')
                    }

                    else {

                    }

                }

            }
        }
        else if (event.key === 'Enter' && (event.target.name !== 'upc' || event.target.name !== 'order_id')) {
            setCurOrderExists(false);

        }



    }

    const changeProduct = (prod_index, quantity) => {

        
        let placeProds = currentOrder.order_products
        let changeProd = currentOrder.order_products[prod_index]
        let changequan = changeProd.total_quantity - changeProd.quantity_passed

        console.log("current order products: ", placeProds);
        console.log("change product: ", changeProd);
        console.log(prod_index);

        // changeProd = {
        //     product_id: 'XYZ000',
        //     total_quantity: 250,
        //     quantity_passed: 0,
        //     passed: false
        // }

        console.log("form quan:", parseInt(form.quantity));
        console.log(changeProd.quantity_passed)
        console.log("changequan quan:", parseInt(changequan));

        if(parseInt(form.quantity) === (parseInt(changequan))){
            changeProd = {
                product_id: changeProd.product_id,
                total_quantity: changeProd.total_quantity,
                quantity_passed: parseInt(changeProd.quantity_passed) + parseInt(form.quantity),
                passed: true
            }
        }

        else if (parseInt(form.quantity) < (parseInt(changequan))){
            changeProd = {
                product_id: changeProd.product_id,
                total_quantity: changeProd.total_quantity,
                quantity_passed: parseInt(changeProd.quantity_passed) + parseInt(form.quantity),
                passed: false
            }
        }

        else{
            console.log("BAD QUANTITY")
        }

        placeProds[prod_index] = changeProd; 

        console.log("updated state?", placeProds);
        
        setCurrentOrder({
            ...currentOrder,
            order_products: placeProds
        })
       







        // let placeHolderPassed = false;
        // if (quantity === form.quantity) {
        //     placeHolderPassed = true;
        // }



        // // let orderIndex = orders.indexOf(currentOrder)
        // let orderIndex = 0;
        // for (let i = 0; i < orders.length; i++) {
        //     if (orders[i] === currentOrder) {
        //         console.log(orders[i])
        //         console.log(currentOrder)
        //         orderIndex = i;
        //     }
        // }
        // console.log(orderIndex);



        // let placeHolderProducts = currentOrder.order_products;
        // placeHolderProducts.splice(prod_index, 1);


        // let placeHolderOrders = orders;
        // placeHolderOrders.splice(orderIndex, 1);






        // setOrders([
        //     ...placeHolderOrders,
        //     placeHolderOrders[orderIndex] =
        //     {
        //         order_id: currentOrder.order_id,


        //         order_products:
        //             [...placeHolderProducts,
        //             placeHolderProducts[prod_index] = {
        //                 product_id: form.upc,
        //                 total_quantity: 50,
        //                 quantity_passed: 0,
        //                 passed: false,
        //             }
        //             ],


        //         completed: false,
        //     }



        // ])


        // setCurrentOrder({
        //     order_id: form.order_id,
        //     order_products: [
        //         ...placeHolderProducts,
        //         placeHolderOrders[prod_index] = {

        //         }


        //     ],
        //     completed: false
        // })
        // console.log(currentOrder);





        // order_id: 'TT4',
        // order_products: [
        //     {
        //         product_id: 'ABC123',
        //         total_quantity: 25,
        //         quantity_passed: 0,
        //         passed: false
        //     },
        //     {
        //         product_id: 'HIJ789',
        //         total_quantity: 25,
        //         quantity_passed: 0,
        //         passed: false
        //     },
        //     {
        //         product_id: 'DEF456',
        //         total_quantity: 25,
        //         quantity_passed: 0,
        //         passed: false
        //     }
        // ],
        // completed: false


    }


    const handlePass = e => {
        e.preventDefault();

    }



    const handleSubmit = e => {
        e.preventDefault();
        console.log(form);
    }



    return (
        <div className='display_QRScanner'>
            <h1>Packing QC</h1>


            <div className='reader' id="reader">

                <label>
                    Order Number:
                    <input
                        type='text'
                        name='order_id'
                        value={form.order_id}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}

                    />
                </label>

                <br></br>

                <label>
                    Product UPC:
                    <input
                        type='text'
                        name='upc'
                        value={form.upc}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </label>

                <br></br>

                <label>
                    Product Quantity:
                    <input
                        type='number'
                        name='quantity'
                        value={form.quantity}
                        onChange={handleChange}

                    />
                </label>
                <br></br>
                <br></br>

                {curOrderExists === true &&
                    <div className='order_display'>
                        <p>Order Number: {currentOrder.order_id}</p>
                        <p>Number of Items: {currentOrder.order_products.length}</p>
                    {console.log( currentOrder)};


                        <div className='product_card'>
                            <label>
                                Products:

                                <ul>
                                    {currentOrder.order_products.map(product => (
                                        <li style={product.passed ? { backgroundColor: 'green' } : { backgroundColor: 'yellow' }} key={product.product_id}>
                                            Product ID: {product.product_id}
                                            <br></br>
                                            Product Quantity: {product.total_quantity}
                                            <br></br>
                                            Product Quantity Passed: {product.quantity_passed}
                                            <br></br>
                                            <button onClick={handlePass}> Manually Pass  </button>
                                        </li>
                                    ))}
                                </ul>

                            </label>
                        </div>
                    </div>
                }

                {curOrderExists !== true &&
                    <p>Order could not be found</p>}
            </div>
        </div>
    )
}


export default QRScanner;