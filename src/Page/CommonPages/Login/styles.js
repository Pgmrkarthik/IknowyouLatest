import { keyframes } from "@emotion/react";
import { after } from "lodash";

export const styles = () => ({
    root: {
      textAlign: "center",
      minHeight: "100vh",
      color: "#000133",
      fontFamily:'arial'
    },
    appBar: {
      background: "#00022E",
      color: "#FC86AA",
    },
    icon: {
      padding: "10px",
    },
    title: {
      margin: "auto",
    },
    container: {
      display: "flex",
      flex: 1,
    },
    drawer: {
      background: "#D8DCD6",
      position: "static",
      transition: "width .7s",
    },
    closed: {
      width: "0px",
    },
    opened: {
      width: "240px",
    },
    kidsImageLeft:{
        width:'28vw',
        position:'absolute',
        paddingLeft:'2rem',
        marginTop:'-5rem'
    },
    kidsImageRight:{
        Animation: `${swing} ease-in-out 1s infinite alternate`,
        width:'30vw',
        position:'absolute',
        marginTop:'-5rem',
        paddingRight:'2rem',
        right:0,
    },
    main: {
      color: "black",
      backgroundImage:`url('/images/bg.webp')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position:'relative',
      height:'100%'
    },
    // bodyimg:{
    //     width:'100vw',
    //     backgroundImage:`url('/images/bg.webp')`,
    //     height:'87vh',
    //     position:'relative'
    // },
    mainContent:{
        Zindex:1,
    }
    ,
    footer: {
      background: "#000000",
      color:'#ffffff',
      position:'absolute',
      bottom:0,
      width:'100vw'
    },
  });

  const swing = keyframes`
  0% { transform: rotate(3deg); }
  100% { transform: rotate(-3deg); }
  `