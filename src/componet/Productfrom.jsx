import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Productfrom = () => {
    const [dt, setDt] = useState([]);
    const [uid, setUid] = useState();
    const [searchQuery, setSearchQuery] = useState('');
      const [productrdata,setproductrdata] = useState({
           productid:'',
           productname :'',
           productdate:'',
           checkIn:'',
           checkout:'',
           userid:''
      })
      const handleChange = (e) => {
        const { name, value } = e.target;
        setproductrdata({ ...productrdata, [name]: value });
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
            body: JSON.stringify(productrdata)
         })
            .then(res => res.json())
            fetchitem();
    }
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

   
    const editData = (id) => {
        setUid(id);
        fetch("http://localhost:3000/products/" + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(json => setproductrdata(json));
    }
    const deleteData = (id) => {
     
        setDt(dt.filter(item => item.id !== id));
    
        fetch("http://localhost:3000/products/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productrdata)
        })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.error('Error deleting data:', error));
        
    }
   
  return (
    <>
        <div className='frm'>
            <form  onSubmit={handleSubmit} method='post'>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        marginLeft: "75px",
                        marginTop: "30px"
                    }}
                > 
                       <TextField fullWidth label="productname" name='productname' value={productrdata.productname} onChange={handleChange} id="fullWidth" />
                       <br /><br />
                    <TextField fullWidth label="productid" name='productid' value={productrdata.productid} onChange={handleChange} id="fullWidth" />
                    <br /><br />
                    <TextField fullWidth label="productdate" name='productdate' value={productrdata.productdate} onChange={handleChange} id="fullWidth" />
                    <br /><br />                 
                    <TextField fullWidth label="UserId" name='userid' value={productrdata.userid} onChange={handleChange} id="fullWidth" />
                    <br /><br />

                    <Button type='submit' variant="contained" color="info">
                        SaveData
                    </Button>
                </Box>
            </form>
        </div>
        

        <table  className='table table-striped mt-5' border={1}>
            <thead>
               <tr className='fw-bold '>
                 <td>productname</td>
                  <td>productId</td>
                  <td>productdate</td>
                  <td>UserId</td>
                  <td>action</td>
                  
               </tr>
            </thead>
            <tbody>
               {
                  dt.map((i) => {
                   return(
                     <tr >
                       <td>{i.productname}</td>
                        <td>{i.productid}</td>
                        <td>{i.productdate}</td>
                        <td>{i.userid}</td>
                        <td><button className='btn btn-outline-success' onClick={() => editData(i.id)}>Edit</button>&nbsp;<button className='btn btn-outline-danger' onClick={() => deleteData(i.id)}>Delete</button></td>
                     </tr>
                  )})
               }
            </tbody>
         </table>
        </>
  )
}

export default Productfrom
