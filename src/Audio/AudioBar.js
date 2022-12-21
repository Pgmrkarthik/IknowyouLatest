import React, { useEffect, useRef } from "react";
import moment from "moment";
import { Stack } from "@mui/material";
import momentDurationFormatSetup from "moment-duration-format";
import './Bar.css'

export default function Bar(props) {

  const progressBar = useRef(null);
  const { duration, curTime, onTimeUpdate, MarkerTimes, deletemarker} = props;
  const curPercentage = (curTime / duration) * 100;
    
  function formatDuration(duration) {
    return moment
      .duration(duration, "seconds")
      .format("mm:ss", { trim: false });
  }
  
  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = progressBar.current;
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function timePerPixel(marker){
    const bar = progressBar.current;
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const timePerPixel = duration / barWidth;

    return (timePerPixel * marker.time);

  }

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = eMove => {
      onTimeUpdate(calcClickedTime(eMove));
    };
    document.addEventListener("mousemove", updateTimeOnMove);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }




  return (
    <Stack spacing={1} pt={1} direction={'column'}>
        <div className="bar">
        <div
            ref={progressBar}
            className='bar__progress'
            id='bar_progress'
            style={{
            background: `linear-gradient(to right, #d551d4 ${curPercentage}%, white 0)`
            }}
            onMouseDown={e => handleTimeDrag(e)}
        /> 
        </div>
        <div>
        <span className="bar__time">{formatDuration(curTime)}</span> / <span className="bar__time">{formatDuration(duration)}</span>
        </div>
    </Stack>
  );
}
