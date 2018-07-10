import * as Moment from 'moment';
import * as React from 'react';
import { IConferenceInfo, ISession } from '../types';
import { Session } from './session';

interface IProps {
  conferenceInfo: IConferenceInfo;
}
interface IState {
  trackFilterValue: number;
  trackTimeValue: string;
}

export class SessionList extends React.Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);

    this.state = {
      trackFilterValue: 0,
      trackTimeValue: ''
    };
  }

  public handleTrackChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ trackFilterValue: Number(event.currentTarget.value) });
  }

  public handleTimeChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ trackTimeValue: event.currentTarget.value });
  }

  public render() {
    const { conferenceInfo } = this.props;
    const { trackFilterValue, trackTimeValue } = this.state;

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

    const getSession = (session: ISession) => {
      return <Session
        conferenceInfo={conferenceInfo}
        tracks={tracks}
        session={session}
      />;
    };

    const shouldTrackBySession = (session: ISession) => {
      return trackFilterValue <= 0 ||
        session.categoryItems.some((categoryId) =>
          categoryId === trackFilterValue);
    };

    const shouldTrackByTime = (session: ISession) => {
      return !trackTimeValue || session.startsAt === trackTimeValue;
    };

    const getSessions = () => {
      const filteredSessions = conferenceInfo.sessions.filter((session) =>
        shouldTrackBySession(session) && shouldTrackByTime(session)
      );
      const sessions = filteredSessions.map((session) => getSession(session));

      return <div>
        <h2>Sessions</h2>
        <div>
          Filter by Track: {trackDropdown}
          Filter by Time: {timeDropdown}
        </div>
        {sessions}
      </div>;
    };
    return getSessions();
  }
}
