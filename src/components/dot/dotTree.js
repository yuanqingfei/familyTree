import React, { Component } from 'react';
import * as d3 from 'd3'
import Graphviz from 'd3-graphviz';
import yuanCsv from '../../data/yuan_dot.dsv';

var dotSrc = `
                digraph familyYuanTree {
                    rankdir = LR;            
                    node [fontname="Arial"];
            `
var docSrcEnd = '}';
function createNodesEdges(node) {
    if ((typeof node.children !== "undefined") && node.children.length > 0) {
        node.children.forEach(element => {
            dotSrc = dotSrc + node.data.name + '->' + element.data.name + ";\n";
            createNodesEdges(element);
        });
    } else {
        return;
    }
}

export default class DotTree extends Component {

    componentDidMount() {
        d3.dsv("|", yuanCsv, function (d) {
            return {
                id: d.id,
                name: d.name,
                parent: d.parent,
                description: d.description
            };
        }).then(function (data) {
            var myRoot = d3.stratify()
                .id(function (d) { return d.id; })
                .parentId(function (d) { return d.parent; })(data);
            // console.log(myRoot);
            createNodesEdges(myRoot, dotSrc);
            dotSrc = dotSrc + docSrcEnd;
            var graphviz = d3.select("#graph").graphviz();
            function render(dotSrc) {
                // console.log('DOT source =', dotSrc);
                var transition1 = d3.transition()
                    .delay(100)
                    .duration(1000);
                graphviz
                    .transition(transition1)
                    .renderDot(dotSrc);
            }
            render(dotSrc);
        });
    }

    render() {
        return (
            <div className="App">
                <script src="https://cdn.jsdelivr.net/npm/viz.js@1.8.1/viz.min.js" type="javascript/worker"></script>
                <div id="graph" style={{ textalign: "center", outline: "1px solid red" }} width={1050} height={650} background='white'>
                </div>
            </div>
        );
    }
}