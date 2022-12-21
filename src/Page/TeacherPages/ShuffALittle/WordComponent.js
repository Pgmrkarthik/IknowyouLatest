import React, { useEffect, useState } from 'react';
import { Stack, Container, Typography, Link, Box, Grid, Card } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import { BabyUnitServices } from '../../../services/BabyUnitServices';
import { root } from '../../../config';

function WordComponent(props) {

    const [Unit, setUnit] = useState(props.Unit);
    const { action } = props;
    const [BabyUnitWords, setBabyUnitWords] = useState([]);
    const navigate = useNavigate();

useEffect(()=>{
  if(Unit){
    BabyUnitServices.GetBabyUnitQuestions(Unit.id).then((response)=>{
        if(response.success){
            setBabyUnitWords(response.BabyUnitQuestions);
        }
        
      })
  }
},[])


    const addNewWord = () =>{
        BabyUnitServices.AddNewBabyUnitQuestion(Unit.id).then((response)=>{
            console.log(response);
            if(response.success){
                setBabyUnitWords(response.result);
            }
        })

        // Words

    }
    const RemoveWord = (word)=>{
        console.log('hek')
        BabyUnitServices.DeleteBabyUnitQuestion(Unit.id,word.id).then((response)=>{
            console.log(response)
            setBabyUnitWords(response.result);
        })
    }


    return (
        <Stack spacing={2}>
            <Stack direction={'row'} justifyContent={'space-between'} pl={4.5}>
                <p className='Instraction'>Words List</p>
                <button onClick={() => {
                    navigate('/home/shuffalittle/')
                }}>
                    <p>Back</p>
                </button>
            </Stack>
            <Stack spacing={2} className={'Unitcontainer'} p={2} >

                <Box
                    style={{ maxHeight: '42vh', overflow: 'auto' }}
                >
                    <Stack spacing={2} px={2} pb={2}>
                        {
                            BabyUnitWords && BabyUnitWords.length > 0 &&
                            BabyUnitWords.map((word, index)=>(
                                <Box key={index}>
                                     <div className='gridbutton' style={{ width: '100%' }} >
                                             <Stack direction={'row'} justifyContent={'space-between'}>
                                                    <Stack
                                                        textAlign={'left'}
                                                        direction={'row'}
                                                        spacing={1.5}
                                                    >
                                                        <div className='imageContanier'>
                                                            <img src={root+word.ThumbnailStoragePath} alt='thumbnail' style={{ borderRadius: '15px' }} width='100' height='80' />
                                                        </div>
                                                        <Stack
                                                            textAlign={'left'}
                                                            alignContent={'bottom'}
                                                            alignSelf={'center'}
                                                            spacing={0.5}
                                                        >
                                                            <p className='UnitName'>{word.Word}</p>
                                                            <h3 className='DateTimeText'>Date Modified : {new Date(word.UpdatedAt).getDate()}/{new Date(word.UpdatedAt).getMonth()}/{new Date(word.UpdatedAt).getFullYear()} {new Date(word.UpdatedAt).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}</h3>
                                                        </Stack>
                                                    </Stack>
                                                    <Box
                                                        py={1}
                                                        alignContent={'right'}
                                                        justifyContent={'right'}
                                                        alignSelf={'center'}
                                                    >
                                                        <Stack direction={'row'} spacing={1.5}>
                                                            <button className='bgorange' onClick={()=>{
                                                                action(word,'SetMarker');
                                                                // navigate('/home/patalong/setmarker/',{state:{Word: word}})
                                                            }}>Set Marker</button>
                                                            <button className='bgpink' onClick={()=>{
                                                                action(word,'Modify');
                                                            }}>Modify</button>
                                                            <button className='garyClose' onClick={()=>{
                                                                RemoveWord(word);
                                                            }}>x</button>
                                                        </Stack>
                                                    </Box>
                                                </Stack>
                                     </div>
                                </Box>

                            ))

                        }
                    </Stack>
                </Box>
                <Stack px={2} pb={2} width={'100%'}>
                    <button onClick={addNewWord}><p>Add New Word</p></button>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default WordComponent