import * as Moment from 'moment';
import * as React from 'react';
import { Col, Input, Label, Row } from 'reactstrap';
import { IConferenceInfo, ISession } from '../types';
import { Session } from './session';

interface IProps {
  conferenceInfo: IConferenceInfo;
}
interface IState {
  trackFilterValue: number;
  trackTimeValue: string;
  markedOnlyValue: boolean;
  markedSessionIds: number[];
}

export class SessionList extends React.Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);

    const storedMarkedSessionIds = localStorage.getItem('markedSessionIds');
    let markedSessionIds: number[] = [];
    if (storedMarkedSessionIds) {
      markedSessionIds = JSON.parse(storedMarkedSessionIds);
    }

    this.state = {
      trackFilterValue: 0,
      trackTimeValue: '',
      markedSessionIds,
      markedOnlyValue: false
    };
  }

  public storeMarkedSessionIds = (sessionId: number, shouldAdd: boolean) => {
    let markedSessionIds = this.state.markedSessionIds;

    if (shouldAdd && markedSessionIds.indexOf(sessionId) < 0) {
      markedSessionIds.push(sessionId);
    }
    if (!shouldAdd && markedSessionIds.indexOf(sessionId) >= 0) {
      markedSessionIds = markedSessionIds.filter((markedSessionId) => markedSessionId !== sessionId);
    }

    this.setState({ markedSessionIds });
    localStorage.setItem('markedSessionIds', JSON.stringify(markedSessionIds));

    return markedSessionIds;
  }

  public handleMarkedChange = (event: React.FormEvent<HTMLInputElement>) => {
    const markedOnlyValue = !this.state.markedOnlyValue;
    this.setState({ markedOnlyValue });
  }

  public handleTrackChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ trackFilterValue: Number(event.currentTarget.value) });
  }

  public handleTimeChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ trackTimeValue: event.currentTarget.value });
  }

  public render() {
    const { conferenceInfo } = this.props;
    const { trackFilterValue, trackTimeValue, markedOnlyValue } = this.state;

    let tracks = conferenceInfo.categories.find((category) => category.title === 'Track');
    if (!tracks) {
      tracks = {
        id: -1,
        title: 'Track',
        items: []
      };
    }

    const trackOptions = tracks.items.map((track) => {
      return <option key={track.id} value={track.id}>{track.name}</option>;
    });

    const trackDropdown = <select id='trackSelector' onChange={this.handleTrackChange}>
      <option key={0} value={0}>All Tracks</option>
      {trackOptions}
    </select>;

    let times = conferenceInfo.sessions.map((session) => session.startsAt);
    times = Array.from(new Set(times));
    times = times.sort();
    const timeOptions = times.map((time, index) =>
      <option key={index} value={time}>{Moment(time).format('dddd, hh:mm a')}</option>);

    const timeDropdown = <select id='timeSelector' onChange={this.handleTimeChange}>
      <option key={0} value={''}>All Times</option>
      {timeOptions}
    </select>;

    const markedCheckbox = <Input type='checkbox' id='markedCheckbox' onChange={this.handleMarkedChange} />;

    const getSession = (session: ISession) => {
      const startMarked = this.state.markedSessionIds.indexOf(session.id) >= 0;

      return <Col key={session.id} xs={12} lg={6} xl={4} className='px-4 border rounded'>
        <Session
          conferenceInfo={conferenceInfo}
          tracks={tracks}
          session={session}
          storeMarkedSessionIds={this.storeMarkedSessionIds}
          startMarked={startMarked}
        />
      </Col>;
    };

    const shouldTrackBySession = (session: ISession) => {
      return trackFilterValue <= 0 ||
        session.categoryItems.some((categoryId) =>
          categoryId === trackFilterValue);
    };

    const shouldTrackByTime = (session: ISession) => {
      return !trackTimeValue || session.startsAt === trackTimeValue;
    };

    const shouldFilterByMarked = (session: ISession) => {
      return !markedOnlyValue || this.state.markedSessionIds.indexOf(session.id) >= 0;
    };

    const getSessions = () => {
      const filteredSessions = conferenceInfo.sessions.filter((session) =>
        shouldTrackBySession(session) && shouldTrackByTime(session) && shouldFilterByMarked(session)
      );

      const sessions = filteredSessions.map((session) => getSession(session));

      return <div>
        <h2>Sessions</h2>
        <Row>
          <Col xm={12} md={4}> Filter by Track: {trackDropdown}</Col>
          <Col xm={12} md={4}> Filter by Time: {timeDropdown}</Col>
          <Col xm={12} md={4}> {markedCheckbox} <Label for='markedCheckbox'>Marked Only</Label></Col>
        </Row>
        <Row className='mt-4'>
          <Col xs={12} className='d-flex justify-content-center'>
            <span className='bg-info'>Note: To mark a session,
            tap or click on the title of that session!</span>
          </Col>
        </Row>
        <Row className='mt-4'>
          {sessions}
        </Row>
      </div>;
    };

    return getSessions();
  }
}
