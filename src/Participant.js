import React, { useState, useEffect, useRef } from "react";
import {Button, IconButton} from "@material-ui/core";

import {
  Chat,
  Report,
  VideoCall,
  VideocamOff,
  VolumeOff,
  VolumeUp
} from "@material-ui/icons";
import Webcam from "react-webcam";

const Participant = ({ participant }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [clicked, setClicked] = useState();
  const [clicked2, setClicked2] = useState();

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <div className="participant">
      <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={true} />
      <div className="padding">
        <div classRoom="container">
          <IconButton aria-label="chat" color="primary">
            <Chat/>
          </IconButton>
          <IconButton aria-label="mute" color="primary" onClick={() => setClicked(true)}>
            {clicked ?  <VolumeUp/> : <VolumeOff/>}
          </IconButton>
          <IconButton aria-label="video call off" color="primary">
            <VideocamOff/>
          </IconButton>
          <IconButton aria-label="report" color="primary">
            <Report/>
          </IconButton>
        </div>
      </div>
      <div className="videos">
        <div id="video-container">
          <Button className="tes" color="primary" onClick={() => setClicked2(true)}>
            JOIN
            {clicked2 ? <Webcam
                width={60}
                height={60}
            /> : <VideoCall/>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Participant;
