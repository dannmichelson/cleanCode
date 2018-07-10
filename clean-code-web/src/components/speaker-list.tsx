import * as React from 'react';
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
      fullName: speaker.fullName,
      display: <Speaker
        conferenceInfo={this.props.conferenceInfo}
        speaker={speaker}
        isExpanded={true}
      />
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
      {filteredSpeakers.map((speaker) => speaker.display)}
    </div>);
  }

  public render() {
    return this.getSpeakers();
  }
}
