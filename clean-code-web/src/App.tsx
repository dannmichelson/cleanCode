import * as React from 'react';
import './App.css';
import { SessionList, SpeakerList } from './components';
import logo from './logo.svg';
import { IConferenceInfo } from './types';

interface IProps {
  myprop?: string;
}
interface IState {
  conferenceInfo: IConferenceInfo;
  display: string;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      display: 'sessions',
      conferenceInfo: {
        sessions: [],
        speakers: [],
        questions: [],
        categories: [],
        rooms: []
      }
    };

    this.loadSiteData();
  }

  public changeDisplay = (display: string) => {
    this.setState({ display });
  }

  public loadSiteData = () => {
    fetch('https://sessionize.com/api/v2/0ivfo3o2/view/all')
      .then((response) => response.json())
      .then((conferenceInfo: IConferenceInfo) => {
        const rooms = conferenceInfo.rooms;
        conferenceInfo.sessions = conferenceInfo.sessions.map((session) => {
          session.room = rooms.find((room) => room.id === session.roomId);
          return session;
        });
        this.setState({ conferenceInfo });
      }
      );
  }

  public render() {
    const showSpeakers = () => this.changeDisplay('speakers');
    const showSessions = () => this.changeDisplay('sessions');

    const itemsToDisplay = () => {
      switch (this.state.display) {
        case 'speakers':
          return (<SpeakerList conferenceInfo={this.state.conferenceInfo} />);
        case 'sessions':
        default:
          return (<SessionList conferenceInfo={this.state.conferenceInfo} />);
      }
    };

    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>KCDC 2018</h1>
        </header>
        <div>
          <button onClick={showSessions}>Sessions</button>
          <button onClick={showSpeakers}>Speakers</button>
        </div>
        {itemsToDisplay()}
      </div>
    );
  }
}

export default App;