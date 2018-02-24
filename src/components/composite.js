import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import Panel from './panel.js';
import FamilyTree from './pathjs/tree.js';
import D3FamilyTree from './d3/d3Tree.js';

class Composite extends Component {
  components = [
    <Panel key="tree" title="朱仓袁氏家谱-pathjs版" text="始祖清，本海州陇西都新二里人也，元末洪武初年，避乱至此。相传为红军赶散，盖当永乐年间山东被剿，遂无居民，因使红衣军人分海州民移居于此，此红军之一说也。或又云：红军为红头蝇也，所至之处，人皆疫死，以此流亡矣。又云：红军贼。后二说皆无所考，疑前说为是。" sources={['components/tree']}>
      <FamilyTree />
    </Panel>,
    <Panel key="tree" title="朱仓袁氏家谱-d3版" text="始祖清，本海州陇西都新二里人也，元末洪武初年，避乱至此。相传为红军赶散，盖当永乐年间山东被剿，遂无居民，因使红衣军人分海州民移居于此，此红军之一说也。或又云：红军为红头蝇也，所至之处，人皆疫死，以此流亡矣。又云：红军贼。后二说皆无所考，疑前说为是。" sources={['components/d3Tree']}>
      <D3FamilyTree />
    </Panel>
  ];

  render() {
    return (
      <div className="container">
        <Grid>
          <Row>
            {this.components[0]}
          </Row>
          <Row>
            {this.components[1]}
          </Row>
        </Grid>
      </div>
    )
  }
};

export default Composite;