import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import { Text } from 'react-native';


import getRelayEnvironment from '../utils/getRelayEnvironment';

export default class DaysTillDeadline extends React.Component {

  dateDifference(deadline) {
    const MILISECONDS_IN_DAYS = 1000 * 3600 * 24;
    const date1 = new Date(deadline);
    const date2 = new Date();
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / MILISECONDS_IN_DAYS);
  }

  render() {
    return (
      <QueryRenderer
        environment={getRelayEnvironment()}
        query={graphql`
          query DaysTillDeadlineQuery {
            room(id:1) {
              sprint {
                deadline
              }
            }
          }
        `}
        variables={{}}
        render={({error, props}) => {
          if (error) {
            return <Text>Error!</Text>;
          }
          if (!props) {
            return <Text>Loading...</Text>;
          }
          return <Text style={{fontSize: 50}}>{this.dateDifference(props.room.sprint.deadline)}</Text>;

        }}
      />
    );
  }
}