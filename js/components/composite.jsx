var React = require('react');
var Row = require('react-bootstrap/Row');
var Panel = require('./panel.jsx');

var Tree = require('./tree.jsx');
module.exports = React.createClass({
  components: [
    <Panel key="tree" title="朱仓袁氏家谱" text="始祖清，本海州陇西都新二里人也，元末洪武初年，避乱至此。相传为红军赶散，盖当永乐年间山东被剿，遂无居民，因使红衣军人分海州民移居于此，此红军之一说也。或又云：红军为红头蝇也，所至之处，人皆疫死，以此流亡矣。又云：红军贼。后二说皆无所考，疑前说为是。" sources={ ['components/tree', 'data/ducks'] }>
      <Tree />
    </Panel>
  ],

  render: function() {
    return (
      <div className="container">
        <Row>
          { this.components[0] }
        </Row>
      </div>
  )}
});