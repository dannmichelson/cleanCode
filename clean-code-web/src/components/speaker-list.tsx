import * as React from 'react';
import { Col, Row } from 'reactstrap';
import { IConferenceInfo, ISpeaker } from '../types';
import { Speaker } from './index';

interface IProps {
  conferenceInfo: IConferenceInfo;
}
interface IState {
  nameFilterValue: string;
}

export class SpeakerList extends React.Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);

    this.state = {
      nameFilterValue: ''
    };
  }

  public getSpeaker = (speaker: ISpeaker) => {
    return {
      key: speaker.id,
      fullName: speaker.fullName,
      display: <Col xs={12} lg={6} className='px-4 border rounded'>
        <Speaker
          key={speaker.id}
          conferenceInfo={this.props.conferenceInfo}
          speaker={speaker}
          isExpanded={true}
        />
      </Col>
    };
  }

  public handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ nameFilterValue: event.currentTarget.value });
  }

  public getSpeakers = () => {
    const { nameFilterValue } = this.state;

    const speakers = this.props.conferenceInfo.speakers.map((speaker) => this.getSpeaker(speaker));
    const filteredSpeakers = speakers.filter((speaker) => {
      return !nameFilterValue || speaker.fullName.toLowerCase().indexOf(nameFilterValue.toLowerCase()) >= 0;
    });

    return (<div>
      <h2>Speakers</h2>
        Filter by name:
      <input type='text' onChange={this.handleNameChange} id='nameFilter' value={this.state.nameFilterValue} />
      <Row className='mt-5'>
        {filteredSpeakers.map((speaker) => speaker.display)}
      </Row>
    </div>);
  }

  public render() {
    return this.getSpeakers();
  }
}
