import React, { Component } from 'react';
import Tree from 'paths-js/tree';
import { dsv } from 'd3-fetch';
import { hierarchy, stratify, tree } from 'd3-hierarchy';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';

// import yuan from '../data/yuan.json';
import yuanCsv from '../data/yuan.dsv';

export default class FamilyTree extends Component {

  constructor(props) {
    super(props);
    this.state = { showProp: false, root: undefined };
  }

  componentDidMount() {
    var that = this;

    var myDsvData = dsv("|", yuanCsv, function (d) {
      return {
        id: d.id,
        name: d.name,
        parent: d.parent,
        description: d.description
      };
    }).then(function (data) {
      var myRoot = stratify()
        .id(function (d) { return d.id; })
        .parentId(function (d) { return d.parent; })(data);

      that.setState({
        root: myRoot
      });

      // var hierarchyRoot = hierarchy(myRoot);

      // var height = hierarchyRoot.height;
      // console.log("count:" + (height + 1));

      // hierarchyRoot.each(function (d) {
      //   console.log("xxx: " +d.id);
      // });
    });

    // var hierarchyRoot = hierarchy(yuan);
    // hierarchyRoot.each(function(d){
    //   console.log(d.data.name);
    // });
    
  }

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

    function prepare() {
      var tree = Tree({
        data: that.state.root,
        // data: yuan,
        children: children,
        width: 4500,
        height: 2200,
        tension: 0.11
      });

      var curves = tree.curves.map(function (c) {
        return <path key={c.index} d={c.connector.path.print()} fill="none" stroke="gray" />
      })

      var nodes = tree.nodes.map(function (n) {
        var position = "translate(" + n.point[0] + "," + n.point[1] + ")";

        function toggle() {
          // n.item.collapsed = !n.item.collapsed;
          // that.forceUpdate();
        };

        var text;
        var desc;
        if (children(n.item).length > 0) {
          text = <text transform="translate(-15,-5)" textAnchor="end">{n.item.data.name}</text>;
          desc = <text transform="translate(-15,13)" textAnchor="end">{n.item.data.description}</text>;
        } else {
          text = <text transform="translate(10,0)" textAnchor="start">{n.item.data.name}</text>;
          desc = <text transform="translate(10,13)" textAnchor="start">{n.item.data.description}</text>;
        }

        function mouseIn() {
          that.setState({
            showProp: true
          });
        }

        function mouseOut() {
          that.setState({
            showProp: false
          });
        }

        const showPropConst = that.state.showProp;
        return (
          <g key={n.point[1] + n.point[0]} transform={position}>
            <circle fill="white" stroke="black" r="8" cx="0" cy="0" onClick={toggle} onMouseOver={mouseIn} onMouseOut={mouseOut} />
            {text}
            {showPropConst && desc}
          </g>
        )
      });
      return {
        nodes, curves
      }
    }

    if (that.state.root) {
      return <div id="tree">
        <ReactSVGPanZoom style={{ outline: "1px solid red" }} width={1050} height={650} background='white' tool='auto'>
          <svg width={3500} height={1500}>
            <g key='svg' fillOpacity=".5" strokeWidth="2">
              {prepare().curves}
              {prepare().nodes}
            </g>
          </svg>
        </ReactSVGPanZoom>
      </div>
    } else {
      return <div>Loading...</div>;
    }
  }
};


