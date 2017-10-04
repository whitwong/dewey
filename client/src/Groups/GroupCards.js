import React, { Component } from 'react';


import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class GroupCards extends Component {

  render() {

    let display;
    if (!this.props.groups.data) {
      display = (
        <div className="col-sm-12">
          <Card style={{ marginTop: '30px' }}>
            <CardHeader title='Create or join groups to see them here' />
          </Card>
        </div>
      );
    } else {
      display = (
        <div className="col-sm-12">
          {this.props.groups.data.map((group, i) => {

            return (

              <Card key={i} style={{ marginTop: '30px' }}>
                <CardHeader
                  title={group.name}
                  titleStyle={{ fontSize: '22px' }}
                />
                <CardActions>
                  <FlatButton
                    label="Open Discussions"
                    onClick={() => this.props.selectGroup(group)}
                  />
                  <FlatButton label="See Members" />
                </CardActions>
                {/* <Discussion groupId={group.id} /> */}
              </Card>
            );
          })}
        </div>
      );
    }

    return (
        <div className="container">
          <div className="row">

            {/* Render filler text or search results if user has submitted a search */}
            {display}
          </div>
        </div>


    );
  }
}

export default GroupCards


