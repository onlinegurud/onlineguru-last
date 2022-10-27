import { React, useState, useEffect } from 'react';
import { VideoSDKMeeting } from '@videosdk.live/rtc-js-prebuilt';
import './Studentview.css';

import axios from 'axios.js';

const Studentview = (props) => {
  const createmeeting = async () => {
    let meetingid = props.class_detail.Link;

    console.log('https://' + window.location.host + '?meetingId=' + meetingid);

    const apiKey = process.env.REACT_APP_VIDEOSDK_API_KEY;
    const meetingId = meetingid;
    const name = 'Demo User2';

    const config = {
      name: props.class_detail.student_name,
      meetingId: meetingId,
      apiKey: apiKey,

      containerId: null,
      redirectOnLeave: 'https://' + window.location.host + '/class/rating',

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
        endMeeting: false, // End meeting for all participant
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

    localStorage.setItem('id_student', props.class_detail.id_student);
    localStorage.setItem('id_teacher', props.class_detail.id_teacher);
    localStorage.setItem('classes_id', props.class_detail.classes_id);
    localStorage.setItem('topic', props.class_detail.topic);
  };

  const [dis, update_dis] = useState(true);

  //get teacher name
  const [teacher_name, update_teacher_name] = useState('');

  useEffect(async () => {
    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'teacher/info/getbyid',
      {
        teacher_id: props.class_detail.id_teacher,
      },
      {
        headers: headers,
      }
    );

    update_teacher_name(result.data.result.Name);
  }, []);

  return (
    <div className="student-view">
      {dis && (
        <div>
          <h3>Class Info:</h3>
          <div className="inner-student-view">
            <p>TOPIC &emsp;&emsp;&emsp;&emsp;&emsp;: {props.class_detail.topic}</p>
            <p>TEACHER&emsp;&nbsp;&nbsp;&emsp;&emsp;:{teacher_name}</p>
            <p>REQUEST TIME&nbsp;&nbsp;&nbsp;:{props.class_detail.req_time}</p>

            <button
              disabled={props.class_detail.Link == 'wait' ? true : false}
              onClick={() => {
                createmeeting();
                update_dis(false);
                props.update_stu_view(false);
                localStorage.setItem('teacher_name', teacher_name);
              }}
            >
              join Meeting
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Studentview;
