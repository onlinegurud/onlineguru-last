import axios from 'axios';
import {React, useEffect,useState} from 'react';
import { useSearchParams } from 'react-router-dom';



import './Maintance.css';


const Maintance=()=>{


    const[last_id,update_last_id]=useState(0);
   
   const [popup,update_popup]=useState(false);

   const update_popup_handler=()=>{
    if(popup==true){
        update_popup(false);
    }else{
        update_popup(true);
    }
   }


   const [popup2,update_popup2]=useState(false);

   const update_popup_handler2=()=>{
    if(popup2==true){
        update_popup2(false);
    }else{
        update_popup2(true);
    }
   }


   const [i_id,update_i_id]=useState('');
   const [i_Name,update_i_Name]=useState('');
   const [i_quantity,update_i_quantity]=useState('');
   const [i_Price,update_i_Price]=useState('');
  


   
const [item,update_item]=useState([]);    

    useEffect(async()=>{

        const result2=await axios.post("http://localhost:3001/student/fetch",{});


       

        update_item(result2.data.result);
        update_last_id(result2.data.result[result2.data.result.length-1].id);
      

    },[]);



    const remove_item=async(id,Name,quantity,Price)=>{


        const result2=await axios.post("http://localhost:3001/student/update",{
            id:id,
            Name:Name,
            quantity:quantity,
            rating:0,
            dis:'',
            Price:Price
        });

        window.location.reload();



    }

    const undo=async(id,Name,quantity,Price)=>{


        const result2=await axios.post("http://localhost:3001/student/update",{
            id:id,
            Name:Name,
            quantity:quantity,
            rating:1,
            dis:'',
            Price:Price
        });

        window.location.reload();



    }

    const items=item.map((d)=>{
        
        
        if(d.rating!='0'){

            return (
                <tr className='inner-row'>
                    <td>{d.id}</td>
                    <td>{d.Name}</td>
                    <td>{d.quantity}</td>
                    <td>{d.Price}</td>
                    <td><button className={'edit-btn'} onClick={()=>{
                        update_popup_handler();
                       
                        update_i_id(d.id);
                        update_i_Name(d.Name);
                        update_i_quantity(d.quantity);
                        update_i_Price(d.Price);
                        }}>edit</button></td>
                        <td><button  className={'edit-btn'}  onClick={()=>{
                            
                                                 remove_item(d.id,d.Name,d.quantity,d.Price);
                            }}>remove</button></td>
                    
                    
                </tr>
            )

        }else{


            return (
                <tr className='inner-row'>
                    
                    <td>{d.id}
                    <div className='unused-layer'></div></td>
                    <td>{d.Name}</td>
                    <td>{d.quantity}</td>
                    <td>{d.Price}</td>
                    <td><button className={'edit-btn'} onClick={()=>{
                        update_popup_handler();
                       
                        update_i_id(d.id);
                        update_i_Name(d.Name);
                        update_i_quantity(d.quantity);
                        update_i_Price(d.Price);
                        }}>edit</button></td>
                        <td><button  className={'edit-btn-3'}  onClick={()=>{
                            undo(d.id,d.Name,d.quantity,d.Price);
                            }}>undo</button></td>
                    
                    
                </tr>
            )



        }
        

       
    });


 
    

    const f_submit=async(event)=>{

        event.preventDefault();

        const result2=await axios.post("http://localhost:3001/student/update",{
            id:event.target.id.value,
            Name:event.target.Name.value,
            quantity:event.target.quantity.value,
            Price:event.target.Price.value,
            rating:1,
            dis:'',
        });

        window.location.reload();
        


    }


    
    const f_submit_2=async(event)=>{

        event.preventDefault();

        const result2=await axios.post("http://localhost:3001/student/add",{
            id:event.target.id.value,
            Name:event.target.Name.value,
            quantity:event.target.quantity.value,
            rating:1,
            dis:'',
            Price:event.target.Price.value
        });

        window.location.reload();
        


    }

    

    return(
        <div className='maintance'>   

            {popup && (<div className='popup-layer-1' onClick={update_popup_handler}></div>)} 
            {popup && (<div className='popup-layer-2'>

                <form className='form-maintance' onSubmit={f_submit}>                   

                    <label>Id:</label>
                    <input type={'text'}  name='id'  value={i_id} onChange={(event)=>{update_i_id(event.target.value)}}></input>
                    <label>Name:</label>
                    <input type={'text'} name='Name'  value={i_Name} onChange={(event)=>{update_i_Name(event.target.value)}}></input>
                    <label>quantity:</label>
                    <input type={'text'} name='quantity'  value={i_quantity} onChange={(event)=>{update_i_quantity(event.target.value)}}></input>
                    <label>Price:</label>
                    <input type={'text'} name='Price'  value={i_Price} onChange={(event)=>{update_i_Price(event.target.value)}}></input>
                    <input type={'submit'} value='edit' ></input>

                </form>

               
            </div>)} 

            <button className='edit-btn-2'  onClick={()=>{
                    update_popup_handler2();
                   
                    update_i_id('');
                    update_i_Name('');
                    update_i_quantity('');
                    update_i_Price('');
                    }} >Add</button>


            {popup2 &&  (<div className='popup-layer-1' onClick={update_popup_handler2}></div>)}
            {popup2 && ( <div className='popup-layer-2'>

            <form className='form-maintance' onSubmit={f_submit_2}>
    

                <label>Id:</label>
                <input type={'text'} name='id' disabled={true} value={last_id+1} onChange={(event)=>{update_i_id(event.target.value)}}></input>
                <label>Name:</label>
                <input type={'text'} name='Name'  value={i_Name} onChange={(event)=>{update_i_Name(event.target.value)}}></input>
                <label>quantity:</label>
                <input type={'text'} name='quantity'  value={i_quantity} onChange={(event)=>{update_i_quantity(event.target.value)}}></input>
                <label>Price:</label>
                <input type={'text'} name='Price'  value={i_Price} onChange={(event)=>{update_i_Price(event.target.value)}}></input>
                <input type={'submit'} value='Add' ></input>

            </form>


            </div>)}

            <div className='bill-table'>

                <table>
                    <thead>

                   
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>price</th>
                        <th></th>
                        <th></th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {items}
                    </tbody>


                </table>
                

            </div>
            
            
            
            

        </div>
        
    );

}



export default Maintance;