import * as Moment from 'moment';
import * as React from 'react';
import { Col, Row } from 'reactstrap';
import { ICategory, IConferenceInfo, ISession } from '../types';
import { NestedSpeaker } from './index';

interface ISessionProps {
  session: ISession;
  tracks?: ICategory;
  conferenceInfo: IConferenceInfo;
}

export const Session: React.SFC<ISessionProps> = (props) => {
  const getSpeaker = () => {
    const speakerId = props.session.speakers[0];
    const speaker = props.conferenceInfo.speakers.find((s) => s.id === speakerId);
    return speaker;
  };

  const getTrackName = () => {
    if (!props.tracks) {
      return '';
    }

    const track = props.tracks.items.find((category) =>
      props.session.categoryItems.some((categoryId) => category.id === categoryId)
    );

    return track ? track.name : '';
  };

  const getRoom = () => {
    if (!props.session.room) {
      return '?';
    }
    return props.session.room.name;
  };

  return <div>
    <Row className='d-flex justify-content-center'>
      <h3>{props.session.title}</h3>
    </Row>
    <Row>
      <p>{props.session.description}</p>
    </Row>
    <Row>
      <Col xs={4}><h5>Track:</h5>{getTrackName()}</Col>
      <Col xs={4}><h5>Room:</h5>{getRoom()}</Col>
      <Col xs={4}><h5>Time:</h5>{Moment(props.session.startsAt).format('dddd, hh:mm a')}</Col>
      <Col xs={12}><h5>Speaker:</h5><NestedSpeaker speaker={getSpeaker()} /></Col>
    </Row>
  </div>;
};
