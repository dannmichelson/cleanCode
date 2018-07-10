import * as React from 'react';
import { IConferenceInfo, ISession } from '../types';
import { Session } from './session';

interface IProps {
  conferenceInfo: IConferenceInfo;
}
interface IState {
  trackFilterValue: number;
}

export class SessionList extends React.Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);

    this.state = {
      trackFilterValue: 0
    };
  }

  public handleTrackChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ trackFilterValue: Number(event.currentTarget.value) });
  }

  public render() {
    const { conferenceInfo } = this.props;

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
      {trackOptions}
    </select>;

    const getSession = (session: ISession) => {
      return <Session
        conferenceInfo={conferenceInfo}
        tracks={tracks}
        session={session}
      />;
    };

    const getSessions = () => {
      const trackFilterValue = this.state.trackFilterValue;
      const filteredSessions = conferenceInfo.sessions.filter((session) =>
        trackFilterValue <= 0 ||
        session.categoryItems.some((categoryId) =>
          categoryId === trackFilterValue));
      const sessions = filteredSessions.map((session) => getSession(session));

      return <div>
        <h2>Sessions</h2>
        <div>
          Filter by Track: {trackDropdown}
        </div>
        {sessions}
      </div>;
    };
    return getSessions();
  }
}
