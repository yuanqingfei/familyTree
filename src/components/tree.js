import React, { Component } from 'react';
import Tree from 'paths-js/tree';
import yuan from '../data/yuan.json';

import { ReactSVGPanZoom } from 'react-svg-pan-zoom'
import { AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';

class FamilyTree extends Component {

  render() {
    var that = this;

    function children(x) {
      if (x.collapsed) {
        return []
      }
      else {
        return x.children || []
      }
    }

    var tree = Tree({
      data: yuan,
      children: children,
      width: 3500,
      height: 1500,
      tension: 0.11
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
        text = <text transform="translate(-15,-5)" textAnchor="end">{n.item.name}</text>;
      } else {
        text = <text transform="translate(10,0)" textAnchor="start">{n.item.name}</text>;
      }

      return (
        <g key={n.point[1] + n.point[0]} transform={position}>
          <circle fill="white" stroke="black" r="8" cx="0" cy="0" onClick={toggle} />
          {text}
        </g>
      )
    })

    return <div id="tree">
      <ReactSVGPanZoom style={{ outline: "1px solid red" }} width={1050} height={650} background='white' tool='pan'>
        <svg width={3500} height={1500}>
          <g key='svg' fillOpacity=".5" strokeWidth="2">
            {curves}
            {nodes}
          </g>
        </svg>
      </ReactSVGPanZoom>
    </div>
  }
};

export default FamilyTree;