
import { Stack, Container, Typography, Link, Box, Grid, Card, Button } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation,Outlet } from "react-router-dom";
import { root } from "../../config";
import PatWordList from "../CommonPages/PatAlong/PatWordList";
import WordModification from "../CommonPages/Components/WordModificationComponent";
import SetMarker from "../CommonPages/Components/SetMarker";

function PatAlong() {
  const navigate = useNavigate();
  const location = useLocation();
  const AudioRef = useRef();
  const Unit = location.state ? location.state.Unit : false;
  const [unitwords, setUnitwords] = useState(false);
  const [UnitName, setUnitName] = useState('');
  const [isWordList, setWordList] = useState(true);
  const [isOpenValue, setOpenValue] = useState(false);
  const [selectedWord, setSelectedWord] = useState([]);
  return (
    <Container maxWidth="md">
      <Box mt={2}>
        <Stack spacing={2}>
          <p className="Heading1">
            <a href="/home/toddlers" className="Heading1">
              Toddlers{" "}
            </a>{" "}
            {" > "}
            Pat Along
          </p>
          <Box textAlign={'left'}>
                <Outlet /> 
          </Box>
        </Stack>

      </Box>
    </Container>
  )
}

export default PatAlong