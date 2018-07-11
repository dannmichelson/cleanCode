import * as Moment from 'moment';
import * as React from 'react';
import { Col, Row } from 'reactstrap';
import { ICategory, IConferenceInfo, ISession } from '../types';
import { NestedSpeaker } from './index';

interface IProps {
  session: ISession;
  tracks?: ICategory;
  conferenceInfo: IConferenceInfo;
  startMarked: boolean;
  storeMarkedSessionIds: (sessionId: number, shouldAdd: boolean) => number[];
}
interface IState {
  marked: boolean;
}

export class Session extends React.Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);

    this.state = { marked: props.startMarked };
  }

  public toggleMarked = () => {
    const marked = !this.state.marked;
    this.setState({ marked });
    this.props.storeMarkedSessionIds(this.props.session.id, marked);
  }

  public render() {
    const { session, conferenceInfo, tracks } = this.props;
    const getSpeaker = () => {
      const speakerId = session.speakers[0];
      const speaker = conferenceInfo.speakers.find((s) => s.id === speakerId);
      return speaker;
    };

    const getTrackName = () => {
      if (!tracks) {
        return '';
      }

      const track = tracks.items.find((category) =>
        session.categoryItems.some((categoryId) => category.id === categoryId)
      );

      return track ? track.name : '';
    };

    const getRoom = () => {
      if (!session.room) {
        return '?';
      }
      return session.room.name;
    };

    const markedBgColor = this.state.marked ? 'bg-info' : '';

    return <div>
      <Row className={`d-flex justify-content-center ${markedBgColor}`} onClick={this.toggleMarked}>
        <h3>{session.title}</h3>
      </Row>
      <Row>
        <p>{session.description}</p>
      </Row>
      <Row>
        <Col xs={4}><h5>Track:</h5>{getTrackName()}</Col>
        <Col xs={4}><h5>Room:</h5>{getRoom()}</Col>
        <Col xs={4}><h5>Time:</h5>{Moment(session.startsAt).format('dddd, hh:mm a')}</Col>
        <Col xs={12}><h5>Speaker:</h5><NestedSpeaker speaker={getSpeaker()} /></Col>
      </Row>
    </div >;
  }
}
