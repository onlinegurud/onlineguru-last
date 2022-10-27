import { React, useState } from 'react';
import { VideoSDKMeeting } from '@videosdk.live/rtc-js-prebuilt';
import './Studentview.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios.js';

const Teacherview = (props) => {
  const createmeeting = async () => {
    let meetingid = 'xxxxyxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

    console.log(meetingid);

    //updating the class link

    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result2 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'teacher/class/update',
      {
        classes_id: props.class_detail.classes_id,
        Link: meetingid,
      },
      {
        headers: headers,
      }
    );

    //console.log('https://' + window.location.host + '?meetingId=' + meetingid);

    const apiKey = process.env.REACT_APP_VIDEOSDK_API_KEY;
    const meetingId = meetingid;
    const name = 'teacher';

    const config = {
      name: name,
      meetingId: meetingId,
      apiKey: apiKey,

      containerId: null,
      redirectOnLeave: 'https://' + window.location.host + '/teacher/classroom',

      micEnabled: true,
      webcamEnabled: true,
      participantCanToggleSelfWebcam: true,
      participantCanToggleSelfMic: true,

      chatEnabled: true,
      screenShareEnabled: true,
      pollEnabled: true,
      whiteboardEnabled: true,
      raiseHandEnabled: true,

      recordingEnabled: true,
      recordingEnabledByDefault: false,
      recordingWebhookUrl: 'https://www.videosdk.live/callback',
      recordingAWSDirPath: `/meeting-recordings/${meetingId}/`, // automatically save recording in this s3 path

      participantCanLeave: true, // if false, leave button won't be visible

      livestream: {
        autoStart: true,
        outputs: [
          // {
          //   url: "rtmp://x.rtmp.youtube.com/live2",
          //   streamKey: "<STREAM KEY FROM YOUTUBE>",
          // },
        ],
      },

      permissions: {
        askToJoin: false, // Ask joined participants for entry in meeting
        toggleParticipantMic: true, // Can toggle other participant's mic
        toggleParticipantWebcam: true, // Can toggle other participant's webcam
        removeParticipant: true, // Remove other participant from meeting
        endMeeting: true, // End meeting for all participant
        drawOnWhiteboard: true, // Can Draw on whiteboard
        toggleWhiteboard: true, // Can toggle whiteboard
        toggleRecording: true, // Can toggle recording
      },

      joinScreen: {
        visible: true, // Show the join screen ?
        title: props.class_detail.topic, // Meeting title
        // meetingUrl: window.location.href, // Meeting joining url
        meetingUrl: '',
      },

      pin: {
        allowed: true, // participant can pin any participant in meeting
        layout: 'SPOTLIGHT', // meeting layout - GRID | SPOTLIGHT | SIDEBAR
      },

      leftScreen: {
        // visible when redirect on leave not provieded
        actionButton: {
          // optional action button
          label: 'Video SDK Live', // action button label
          href: 'https://videosdk.live/', // action button href
        },
      },
    };

    const meeting = new VideoSDKMeeting();
    meeting.init(config);
  };

  const [dis, update_dis] = useState(true);

  const complete_response = async () => {
    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'teacher/class/complete/response',
      {
        classid: props.class_detail.classes_id,
      },
      {
        headers: headers,
      }
    );

    //replace the link to 'wait'
    const result2 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'teacher/class/update',
      {
        classes_id: props.class_detail.classes_id,
        Link: 'wait',
      },
      {
        headers: headers,
      }
    );

    window.location.replace('https://' + window.location.host + '/teacher/classroom');
  };

  return (
    <div className="student-view">
      {dis && (
        <div>
          <h3>Class Info:</h3>
          <div className="inner-student-view">
            <p>TOPIC &emsp;&emsp;&emsp;&emsp;&emsp;: {props.class_detail.topic}</p>
            <p>STUDENT&nbsp;&emsp;&nbsp;&emsp;&emsp;:{props.class_detail.student_name}</p>
            <p>REQUEST TIME&nbsp;&nbsp;&nbsp;:{props.class_detail.req_time}</p>

            <button
              onClick={() => {
                createmeeting();
                update_dis(false);
                props.update_teacher_view(false);
              }}
            >
              Start Meeting
            </button>
          </div>

          <button className="complete-btn" onClick={complete_response}>
            <CheckCircleIcon className="iicon"></CheckCircleIcon>
            Finished
          </button>
        </div>
      )}
    </div>
  );
};

export default Teacherview;
