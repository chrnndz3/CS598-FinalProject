import React, { useState, useEffect, useRef } from "react";
import { Button, IconButton } from "@material-ui/core";
import { motion } from "framer-motion";
import Modal from "react-modal";
import Form from "./form";

import {
  Chat,
  Report,
  VideoCall, Videocam,
  VideocamOff,
  VolumeOff,
  VolumeUp
} from "@material-ui/icons";
import PanToolIcon from "@material-ui/icons/PanTool";
import Webcam from "react-webcam";

const Participant = ({ participant }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [clicked, setClicked] = useState(false);
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

  const toggleVideo = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const toggleFocus = {
    visible: {
      opacity: 1,
      scale: [1, 1.5, 1, 1.5, 1, 1.5, 1],
      transition: {
        duration: 5,
      },
    },
    hidden: { opacity: 1 },
  };

  const [isClicked, setIsClicked] = useState(true);
  const [isFocus, setFocus] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const manageState = () => {
    setOpenModal(!openModal);
  };

  return (
    <motion.div
      className="participant"
      initial={{ opacity: 0 }}
      animate={isFocus ? "visible" : "hidden"}
      variants={toggleFocus}>
      <h3>{participant.identity}</h3>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isClicked ? "visible" : "hidden"}
        variants={toggleVideo}>
        <video ref={videoRef} autoPlay={true} />
        <audio ref={audioRef} autoPlay={true} muted={true} />
      </motion.div>

      <div className="padding">
        <div classRoom="container">
          <IconButton aria-label="chat" color="primary">
            <Chat />
          </IconButton>
          <IconButton aria-label="mute" color="primary" onClick={() => setClicked(!clicked)}>
            {clicked ? <VolumeUp /> : <VolumeOff />}
          </IconButton>
          <IconButton aria-label="video call off" color="primary" onClick={() => setIsClicked(!isClicked)}>
            {isClicked ? <VideocamOff /> : <Videocam />}
          </IconButton>
          <IconButton aria-label="report" color="primary">
            <Report onClick={() => manageState()} />
            <Modal isOpen={openModal} onRequestClose={() => manageState()}>
              <Form></Form>
              <div className="report">
                <button onClick={() => manageState()}>
                  Report
                </button>
              </div>
            </Modal>
          </IconButton>
          <IconButton>
            <PanToolIcon onClick={() => setFocus(!isFocus)}></PanToolIcon>
          </IconButton>
        </div>
      </div>
      <div className="videos">
        <div id="video-container">
          <Button className="test" color="primary" onClick={() => setClicked2(true)}>
            Join
            {clicked2 ? <Webcam width={100} height={100} /> : <VideoCall />}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Participant;
