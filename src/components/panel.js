import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Panel extends Component {
  render() {
    return (
      <Grid>
        <Col md={12} className="chart-panel">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2 className="panel-title">{this.props.title}</h2>
            </div>

            <div className="panel-body">
              <p className="alert alert-info">{this.props.text}</p>

              <Row>
                <Col md={11}>{this.props.children}</Col>
              </Row>
            </div>
          </div>
        </Col>
      </Grid>
    )
  }
};

export default Panel;