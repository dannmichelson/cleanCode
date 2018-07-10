import * as React from 'react';
import { Button, Col, Jumbotron, Row } from 'reactstrap';
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
        <Jumbotron style={{ padding: '20px' }}>
          <Row>
            <Col xs={12} md={6}>
              <img src={logo} className='App-logo' alt='logo' />
              <h1 className='App-title'>KCDC 2018</h1>
            </Col>
            <Col xs={12} md={6}>
              <Button href='http://www.kcdc.info/' color='danger' target='_blank'>
                Click here to go to the official KCDC page!
            </Button>
            </Col>
          </Row>
        </Jumbotron>
        <Row>
          <Col xs={6} md={{ size: 3, offset: 3 }}>
            <Button block={true} onClick={showSessions} checked={true}>Sessions</Button>
          </Col>
          <Col xs={6} md={3}>
            <Button block={true} onClick={showSpeakers}>Speakers</Button>
          </Col>
        </Row>
        {itemsToDisplay()}
      </div>
    );
  }
}

export default App;
