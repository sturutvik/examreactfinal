// RoomList.js
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Productlist = () => {
    const [dt, setDt] = useState([]);
    const [productdata, setproductData] = useState({
        roomname: '',
        capacity: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setproductData({ ...productdata, [name]: value });
    }
    const fetchitem = async () => {
        try {
           await fetch("http://localhost:3000/products").then(res => res.json()).then
              (res => setDt(res));
        } catch (error) {
           console.log(error.message);
        }
     }
     useEffect(() => {
        fetchitem();
     }, []);

    const handleSubmit = (e) => {
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(productdata)
         })
            .then(res => res.json())
    }

    return (
        <>
        <div className='frm'>
            <form className='frm1' onSubmit={handleSubmit} method='post'>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        marginLeft: "75px",
                        marginTop: "30px"
                    }}
                >
                    <TextField fullWidth label="RoomName" name='roomname' value={productdata.productname} onChange={handleChange} id="fullWidth" />
                    <br /><br />

                    <TextField fullWidth label="capacity" name='capacity' value={productdata.capacity} onChange={handleChange} id="fullWidth" />
                    <br /><br />

                    <Button type='submit' variant="contained" color="success">
                        SaveData
                    </Button>
                </Box>
            </form>
        </div>
        <table  className='table table-striped'>
            <thead>
               <tr className='fw-bold'>
                  <td>Id</td>
                  <td>productName</td>
                  <td>Capacity</td>
               </tr>
            </thead>
            <tbody>
               {
                  dt.map((i) => {
                   return(
                     <tr>
                        <td>{i.id}</td>
                        <td>{i.productname}</td>
                        <td>{i.capacity}</td>
                     </tr>
                  )})
               }
            </tbody>
         </table>
        </>
    )
}

export default Productlist
