import React from "react";
import { useState } from "react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";

export default class Video extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      connection: "Connecting",
      publishVideo: true,
    };

    this.sessionEventHandlers = {
      sessionConnected: () => {
        this.setState({ connection: "Connected" });
      },
      sessionDisconnected: () => {
        this.setState({ connection: "Disconnected" });
      },
      sessionReconnected: () => {
        this.setState({ connection: "Reconnected" });
      },
      sessionReconnecting: () => {
        this.setState({ connection: "Reconnecting" });
      },
    };

    this.publisherEventHandlers = {
      accessDenied: () => {
        console.log("User denied access to media source");
      },
      streamCreated: () => {
        console.log("Publisher stream created");
      },
      streamDestroyed: ({ reason }) => {
        console.log(`Publisher stream destroyed because: ${reason}`);
      },
    };

    this.subscriberEventHandlers = {
      videoEnabled: () => {
        console.log("Subscriber video enabled");
      },
      videoDisabled: () => {
        console.log("Subscriber video disabled");
      },
    };
  }

  onSessionError = (error) => {
    this.setState([error]);
  };

  onPublish = () => {
    console.log("Publish Success");
  };

  onPublishError = (error) => {
    this.setState([error]);
  };

  onSubscribe = () => {
    console.log("Subscribe Success");
  };

  onSubscribeError = (error) => {
    this.setState([error]);
  };

  toggleVideo = () => {
    this.setState((state) => ({
      publishVideo: !state.publishVideo,
    }));
  };

  render() {
    const sessionId = this.props.sessionId;
    const token = this.props.token;
    const apiKey = this.props.apiKey;
    const { error, connection, publishVideo } = this.state;

    return (
      <div>
        {/* <div id="sessionStatus">Session Status: {connection}</div>
        {error ? (
          <div className="error">
          <strong>Error:</strong> {error}
        </div> */}
        {/* ) : null} */}
        <OTSession
          apiKey={apiKey}
          sessionId={sessionId}
          token={token}
          onError={this.onSessionError}
          eventHandlers={this.sessionEventHandlers}
        >
          {console.log(apiKey)}
          {console.log(sessionId)}
          {console.log(token)}
          {/* {console.log(this.props)} */}
          {/* {console.log(sessionId)} */}
          <button id="videoButton" onClick={this.toggleVideo}>
            {publishVideo ? "Disable" : "Enable"} Video
          </button>
          <OTPublisher
            properties={{ publishVideo, width: 150, height: 150 }}
            onPublish={this.onPublish}
            onError={this.onPublishError}
            eventHandlers={this.publisherEventHandlers}
          />
          <OTStreams>
            <OTSubscriber
              properties={{ width: 150, height: 150 }}
              onSubscribe={this.onSubscribe}
              onError={this.onSubscribeError}
              eventHandlers={this.subscriberEventHandlers}
            />
          </OTStreams>
        </OTSession>
      </div>
    );
  }
}