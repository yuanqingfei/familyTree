import React, { Component } from 'react';
import Tree from 'paths-js/tree';
import yuan from '../data/yuan.json';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';

function children(x) {
  if (x.collapsed) {
    return []
  }
  else {
    return x.children || []
  }
}

class FamilyTree extends Component {

  render() {
    var that = this;

    var tree = Tree({
      data: yuan,
      children: children,
      width: 350,
      height: 300
    });

    var curves = tree.curves.map(function (c) {
      return <path key={c.index} d={c.connector.path.print()} fill="none" stroke="gray" />
    })

    var nodes = tree.nodes.map(function (n) {
      var position = "translate(" + n.point[0] + "," + n.point[1] + ")";

      function toggle() {
        n.item.collapsed = !n.item.collapsed;
        that.forceUpdate();
      };

      var text;
      if (children(n.item).length > 0) {
        text = <text transform="translate(-10,0)" textAnchor="end">{n.item.name}</text>;
      } else {
        text = <text transform="translate(10,0)" textAnchor="start">{n.item.name}</text>;
      }

      return (
        <g key={n.point[1] + n.point[0]} transform={position}>
          <circle fill="white" stroke="black" r="5" cx="0" cy="0" onClick={toggle} />
          {text}
        </g>
      )
    })

    return <div id="tree">
      <ReactSVGPanZoom width={1800} height={1000}>
        <svg width={1800} height={1000}>
          <g key='svg'>
            {curves}
            {nodes}
          </g>
        </svg>
      </ReactSVGPanZoom>
    </div>
  }
};

export default FamilyTree;