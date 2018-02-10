var React = require('react');
var Tree = require('paths-js/tree');
var yuan = require('../data/yuan.json');
// var ReactSVGPanZoom = require('react-svg-pan-zoom').default;

function children(x) {
  if(x.collapsed) {
    return []
  }
  else {
    return x.children || []
  }
}

module.exports = React.createClass({

  render: function() {
    var that= this;

    var tree = Tree({
      data: yuan,
      children: children,
      width: 350,
      height: 300
    });

    var curves = tree.curves.map(function(c) {
      return <path d={ c.connector.path.print() } fill="none" stroke="gray" />
    })

    var nodes = tree.nodes.map(function(n) {
      var position = "translate(" + n.point[0] +"," + n.point[1]  +")";

      function toggle() {
        n.item.collapsed =  !n.item.collapsed;
        that.forceUpdate();
      };

      if(children(n.item).length > 0) {
        var text = <text transform="translate(-10,0)" textAnchor="end">{ n.item.name }</text>;
      } else {
        var text = <text transform="translate(10,0)" textAnchor="start">{ n.item.name }</text>;
      }

      return (
        <g transform={ position }>
          <circle fill="white" stroke="black" r="5" cx="0" cy="0" onClick={ toggle }/>
          { text }
        </g>
      )
    })

    return <div id="tree">
      {/* <ReactSVGPanZoom width={500} height={500}> */}
      <svg>
        <g>
          { curves }
          { nodes }
        </g>
      </svg>
      {/* </ReactSVGPanZoom> */}
    </div>
  }
});