import * as React from 'react';
import { ICategory, IConferenceInfo, ISession } from '../types';
import { NestedSpeaker } from './index';

interface ISessionProps {
  session: ISession;
  tracks?: ICategory;
  conferenceInfo: IConferenceInfo;
}

export const Session: React.SFC<ISessionProps> = (props) => {
  const getSpeaker = () => {
    const speakerId = props.session.speakers[0];
    const speaker = props.conferenceInfo.speakers.find((s) => s.id === speakerId);
    return speaker;
  };

  const getTrackName = () => {
    if (!props.tracks) {
      return '';
    }

    const track = props.tracks.items.find((category) =>
      props.session.categoryItems.some((categoryId) => category.id === categoryId)
    );

    return track ? track.name : '';
  };

  return <div>
    <h3>{props.session.title}</h3>
    <p>{props.session.description}</p>
    <div>Speaker: <NestedSpeaker speaker={getSpeaker()} /></div>
    <div>Track: {getTrackName()}</div>
    <div>Time: {props.session.startsAt}</div>
  </div>;
};
