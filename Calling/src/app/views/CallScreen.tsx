// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "./style_a.css";

import { GroupCallLocator, TeamsMeetingLinkLocator } from '@azure/communication-calling';
import { CommunicationUserIdentifier } from '@azure/communication-common';
import {
  CallAdapter,
  CallAdapterState,
  CallComposite,
  createAzureCommunicationCallAdapter,
  toFlatCommunicationIdentifier
} from '@azure/communication-react';
import { Spinner } from '@fluentui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useSwitchableFluentTheme } from '../theming/SwitchableFluentThemeProvider';
import { createAutoRefreshingCredential } from '../utils/credential';
import MobileDetect from 'mobile-detect';

import {
  buttonStyle
} from '../styles/HomeScreen.styles';
// import { Stack, PrimaryButton, Image, ChoiceGroup, IChoiceGroupOption, Text, TextField } from '@fluentui/react';
// //追加IImageProps
// import { IImageProps } from '@fluentui/react/lib/Image';

//追加音声
import useSound from 'use-sound';


const AWS = require('aws-sdk')
const bucket = 'team-a-hikikomori' // the bucketname without s3://
const photo  = 'download.jpg' // the name of file
const config = new AWS.Config({
  // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-1"
})
const client = new AWS.Rekognition(config);
const params = {
  Image: {
    S3Object: {
      Bucket: bucket,
      Name: photo
    },
  },
  Attributes: ['ALL']
}

client.detectFaces(params, function(err, response) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log(`Detected faces for: ${photo}`)
    response.FaceDetails.forEach(data => {
      let low  = data.AgeRange.Low
      let high = data.AgeRange.High
      console.log(`The detected face is between: ${low} and ${high} years old`)
      console.log("All other attributes:")
      console.log(`  BoundingBox.Width:      ${data.BoundingBox.Width}`)
      console.log(`  BoundingBox.Height:     ${data.BoundingBox.Height}`)
      console.log(`  BoundingBox.Left:       ${data.BoundingBox.Left}`)
      console.log(`  BoundingBox.Top:        ${data.BoundingBox.Top}`)
      console.log(`  Age.Range.Low:          ${data.AgeRange.Low}`)
      console.log(`  Age.Range.High:         ${data.AgeRange.High}`)
      console.log(`  Smile.Value:            ${data.Smile.Value}`)
      console.log(`  Smile.Confidence:       ${data.Smile.Confidence}`)
      console.log(`  Eyeglasses.Value:       ${data.Eyeglasses.Value}`)
      console.log(`  Eyeglasses.Confidence:  ${data.Eyeglasses.Confidence}`)
      console.log(`  Sunglasses.Value:       ${data.Sunglasses.Value}`)
      console.log(`  Sunglasses.Confidence:  ${data.Sunglasses.Confidence}`)
      console.log(`  Gender.Value:           ${data.Gender.Value}`)
      console.log(`  Gender.Confidence:      ${data.Gender.Confidence}`)
      console.log(`  Beard.Value:            ${data.Beard.Value}`)
      console.log(`  Beard.Confidence:       ${data.Beard.Confidence}`)
      console.log(`  Mustache.Value:         ${data.Mustache.Value}`)
      console.log(`  Mustache.Confidence:    ${data.Mustache.Confidence}`)
      console.log(`  EyesOpen.Value:         ${data.EyesOpen.Value}`)
      console.log(`  EyesOpen.Confidence:    ${data.EyesOpen.Confidence}`)
      console.log(`  MouthOpen.Value:        ${data.MouthOpen.Value}`)
      console.log(`  MouthOpen.Confidence:   ${data.MouthOpen.Confidence}`)
      console.log(`  Emotions[0].Type:       ${data.Emotions[0].Type}`)
      console.log(`  Emotions[0].Confidence: ${data.Emotions[0].Confidence}`)
      console.log(`  Landmarks[0].Type:      ${data.Landmarks[0].Type}`)
      console.log(`  Landmarks[0].X:         ${data.Landmarks[0].X}`)
      console.log(`  Landmarks[0].Y:         ${data.Landmarks[0].Y}`)
      console.log(`  Pose.Roll:              ${data.Pose.Roll}`)
      console.log(`  Pose.Yaw:               ${data.Pose.Yaw}`)
      console.log(`  Pose.Pitch:             ${data.Pose.Pitch}`)
      console.log(`  Quality.Brightness:     ${data.Quality.Brightness}`)
      console.log(`  Quality.Sharpness:      ${data.Quality.Sharpness}`)
      console.log(`  Confidence:             ${data.Confidence}`)
      console.log("------------")
      console.log("")
    }) // for response.faceDetails
  } // if
});














const detectMobileSession = (): boolean => !!new MobileDetect(window.navigator.userAgent).mobile();

export interface CallScreenProps {
  token: string;
  userId: CommunicationUserIdentifier;
  callLocator: GroupCallLocator | TeamsMeetingLinkLocator;
  displayName: string;
  webAppTitle: string;
  onCallEnded: () => void;
}

export const CallScreen = (props: CallScreenProps): JSX.Element => {
  const { token, userId, callLocator, displayName, webAppTitle, onCallEnded } = props;
  const [adapter, setAdapter] = useState<CallAdapter>();
  const callIdRef = useRef<string>();
  const adapterRef = useRef<CallAdapter>();
  const { currentTheme, currentRtl } = useSwitchableFluentTheme();
  const [isMobileSession, setIsMobileSession] = useState<boolean>(detectMobileSession());



    //追加 flag
    const [flag, setflag] = useState(0);

    function FlagReset(){
      setflag(0);
    }  
  
  
    const[play] = useSound("http://pro-video.jp/voice/announce/mp3/ohayo01mayu.mp3");


  useEffect(() => {
    if (!callIdRef.current) {
      return;
    }
    console.log(`Call Id: ${callIdRef.current}`);
  }, [callIdRef.current]);

  // Whenever the sample is changed from desktop -> mobile using the emulator, make sure we update the formFactor.
  useEffect(() => {
    const updateIsMobile = (): void => setIsMobileSession(detectMobileSession());
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  useEffect(() => {
    (async () => {
      const adapter = await createAzureCommunicationCallAdapter({
        userId,
        displayName,
        credential: createAutoRefreshingCredential(toFlatCommunicationIdentifier(userId), token),
        locator: callLocator
      });
      adapter.on('callEnded', () => {
        onCallEnded();
      });
      adapter.on('error', (e) => {
        // Error is already acted upon by the Call composite, but the surrounding application could
        // add top-level error handling logic here (e.g. reporting telemetry).
        console.log('Adapter error event:', e);
      });
      adapter.onStateChange((state: CallAdapterState) => {
        const pageTitle = convertPageStateToString(state);
        document.title = `${pageTitle} - ${webAppTitle}`;

        callIdRef.current = state?.call?.id;
      });
      setAdapter(adapter);
      adapterRef.current = adapter;
    })();

    return () => {
      adapterRef?.current?.dispose();
    };
  }, [callLocator, displayName, token, userId, onCallEnded]);

  if (!adapter) {
    return <Spinner label={'Creating adapter'} ariaLive="assertive" labelPosition="top" />;
  }

  return (

    <body>
      <div style={{ height: '100vh', width:'80vw' }}>
        <CallComposite
          adapter={adapter}
          fluentTheme={currentTheme.theme}
          rtl={currentRtl}
          callInvitationUrl={window.location.href}
          formFactor={isMobileSession ? 'mobile' : 'desktop'}
        />
      </div>


      <div className="color"></div>

      <div>

      </div>

      <div className="button-wrapper">
        <a className="img-button button-style" 
          onClick={() => {
            setflag(1);
            window.setTimeout(FlagReset, 2000);
          }}>恐怖画像1
        </a>

        <a className="img-button button-style" 
          onClick={() => {
            setflag(1);
            window.setTimeout(FlagReset, 2000);
          }}>恐怖画像2
        </a>

        <a className="img-button button-style" 
          onClick={() => {
            setflag(1);
            window.setTimeout(FlagReset, 2000);
          }}>恐怖画像3
        </a>

        <a className="sound-button button-style" 
          onClick={() => {
            play();
          }}>恐怖音1
        </a>

        <a className="sound-button button-style" 
          onClick={() => {
            play();
          }}>恐怖音2
        </a>

        <a className={buttonStyle} 
          onClick={() => {
            play();
          }}>恐怖音3
        </a>

      </div>


      {/*追加 画像表示*/}
      {flag && <img className="img-a" src="https://1.bp.blogspot.com/-tVeC6En4e_E/X96mhDTzJNI/AAAAAAABdBo/jlD_jvZvMuk3qUcNjA_XORrA4w3lhPkdQCNcBGAsYHQ/s1048/onepiece01_luffy.png" alt="Example with no image fit value and only width is specified." />} 

    </body>
  );

};







const convertPageStateToString = (state: CallAdapterState): string => {
  switch (state.page) {
    case 'accessDeniedTeamsMeeting':
      return 'error';
    case 'leftCall':
      return 'end call';
    case 'removedFromCall':
      return 'end call';
    default:
      return `${state.page}`;
  }
};