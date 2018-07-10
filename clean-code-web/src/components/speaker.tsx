import * as React from 'react';
import { IConferenceInfo, ISpeaker } from '../types';

interface IProps {
  speaker?: ISpeaker;
  isExpanded?: boolean;
  conferenceInfo: IConferenceInfo;
}
interface IState {
  isExpanded: boolean;
}

export class Speaker extends React.Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);

    this.state = { isExpanded: props.isExpanded || false };
  }

  public toggle = () => {
    const isExpanded = this.state.isExpanded;
    this.setState({ isExpanded: !isExpanded });
  }

  public getDisplay() {
    const { isExpanded } = this.state;
    const { speaker } = this.props;
    if (!speaker) {
      return ('');
    }

    const sessions = speaker.sessions.map((sessionId) => {
      const session = this.getSession(sessionId);
      if (!session) {
        return <div key={sessionId}>{sessionId}</div>;
      }

      return <div key={sessionId}>
        {session.title}: {session.startsAt} in {session.room ? session.room.name : 'tbd'}
      </div>;
    });

    const sessionBlock =
      <div>
        <h4>Sessions</h4>
        {sessions}
      </div>;

    return (
      isExpanded ? <div>
        <h3>
          {speaker.fullName}
        </h3>
        <h4>{speaker.tagLine ? speaker.tagLine : ''}</h4>
        <div>
          <img src={speaker.profilePicture} />
          <p>{speaker.bio}</p>
        </div>
        {sessionBlock}
      </div> :
        speaker.fullName
    );
  }

  public render() {
    return (
      <div onClick={this.toggle}>
        {this.getDisplay()}
      </div>
    );
  }

  private getSession(sessionId: number) {
    return this.props.conferenceInfo.sessions.find((session) => Number(session.id) === sessionId);
  }
}
