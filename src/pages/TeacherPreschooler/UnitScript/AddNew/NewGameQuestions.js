
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Stack,
    Container,
    InputLabel,
    TextField,
    Card,
    Grid,
    Divider
} from "@mui/material";
import { PreSchoolerServices } from '../../../../services/PreSchoolerUnitServices';



function GameQuestion() {
    const [Questions, setQuestions] = useState([]);
    const { id, scriptid } = useParams();
    const [ reload, setreload] = useState(false);
    const navigate = useNavigate();


    const getAllQuestions = () => {
        PreSchoolerServices.GetAllQuestions(scriptid).then((res) => {
            if (res.success) {
                console.log(res.Questions)
                setQuestions(res.Questions);
            }
            else {
                alert(res.message);
            }

        })
    }

    useEffect(() => {
        getAllQuestions();
    }, [reload]);

    const deleteQuestion =(question)=>{
        PreSchoolerServices.DeleteQuestion(question.id).then((res)=>{
            if(res.success){
                setreload(true);
            }
        })
    }



    return (
        <Container>
            <Card>
                <Grid container spacing={{ xs: 2 }} height="100%">

                    <Grid item xs={12} sm={6} md={7}>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            minHeight="100%"
                        >
                            <Stack spacing={4}>
                                <h3>Where is the __________?</h3>
                                <Stack spacing={1}>
                                    <p>Add New Question:</p>
                                    <Button fullWidth variant="contained" onClick={() => {
                                        navigate(`/Teacher/Preschooler/${id}/${scriptid}/AddQuestion`)
                                    }}>
                                        Add New Question
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>

                    </Grid>

                    <Grid item xs={12} sm={6} md={5}>
                        <Typography  m={2}>Existing question list:</Typography>
                        <Box m={2} style={{maxHeight: 600, overflow: 'auto'}}>
                            <Stack spacing={4} pb={2}>
                                {
                                    Questions.length > 0 &&
                                            Questions.map((question, key) => (
                                                <Card sx={{ backgroundColor: 'white', color: 'blue' }} key={key}>
                                                <Grid p={3} direction="row" container spacing={{ xs: 2 }} height="100%">
                                                    <Grid item sx={{ width: "80%" }}>
                                                        {question.qstring}
                                                    </Grid>
                                                    <Grid item sx={{ width: "20%" }}>
                                                        <Stack spacing={1}>
                                                            <Button variant="contained"
                                                            onClick={()=>{
                                                                navigate(`/Teacher/Preschooler/${id}/${scriptid}/AddQuestion`,{state:{QID:question.id}})
                                                            }}
                                                            >
                                                                edit
                                                            </Button>
                                                            <Button variant="contained" color='error' onClick={()=>{
                                                                deleteQuestion(question)
                                                            }}>
                                                                delete
                                                            </Button>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                                </Card>
                                            )) 
                                }

                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Container>

    )
}

export default GameQuestion