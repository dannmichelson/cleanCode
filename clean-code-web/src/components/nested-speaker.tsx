import * as React from 'react';
import { ISpeaker } from '../types';

interface IProps {
  speaker?: ISpeaker;
  isExpanded?: boolean;
}
interface IState {
  isExpanded: boolean;
}

export class NestedSpeaker extends React.Component<IProps, IState> {
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
}
