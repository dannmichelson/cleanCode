import * as Moment from 'moment';
import * as React from 'react';
import { IConferenceInfo, ISpeaker } from '../types';

interface IProps {
  speaker?: ISpeaker;
  conferenceInfo: IConferenceInfo;
}
interface IState {
  isExpanded: boolean;
}

export class Speaker extends React.Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);
  }

  public getDisplay() {
    const { speaker } = this.props;
    if (!speaker) {
      return ('');
    }

    const sessions = speaker.sessions.map((sessionId) => {
      const session = this.getSession(sessionId);
      if (!session) {
        return <div key={sessionId}>{sessionId}</div>;
      }

      const startDateTime = Moment(session.startsAt).format('dddd, hh:mm a');

      return <div key={sessionId}>
        {session.title}: {startDateTime} in room {session.room ? session.room.name : 'tbd'}
      </div>;
    });

    const sessionBlock =
      <div>
        <h4>Sessions</h4>
        {sessions}
      </div>;

    return (
      <div>
        <h3>
          {speaker.fullName}
        </h3>
        <h4>{speaker.tagLine ? speaker.tagLine : ''}</h4>
        <div>
          <img src={speaker.profilePicture} />
          <p>{speaker.bio}</p>
        </div>
        {sessionBlock}
      </div>
    );
  }

  public render() {
    return (
      <div>
        {this.getDisplay()}
      </div>
    );
  }

  private getSession(sessionId: number) {
    return this.props.conferenceInfo.sessions.find((session) => Number(session.id) === sessionId);
  }
}
