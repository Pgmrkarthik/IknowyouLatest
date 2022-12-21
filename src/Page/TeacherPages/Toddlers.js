import { Typography,Container,Stack, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Toddlers() {
    const navigate = useNavigate();
    const handleshuff =(e)=>{
        navigate('/home/shuffalittle/');
    }
    const handlepat =(e)=>{
        navigate('/home/patalong/');
    }
  return (
    <Container>
        <Stack mt={2} spacing={4} alignItems={'center'}>
            <p className='Heading1'>Toddlers</p>
            <p className='Instraction'>Select game type to Continue</p>
            <button className='LargeButton' onClick={handleshuff}>
                <p className='Heading1'>Shuff A Little</p>
            </button>
            <button className='LargeButton'  onClick={handlepat}>
                <p className='Heading1' >Pat Along</p>
            </button>

        </Stack>
        
    </Container>
  )
}

export default Toddlers