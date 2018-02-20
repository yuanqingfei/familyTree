import React, { Component } from 'react';
import { dsv } from 'd3-fetch';
import { hierarchy, stratify, tree } from 'd3-hierarchy';
import PropTypes from 'prop-types';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
import Link from './link';
import Node from './node';

// import css from './d3Tree.css';

import yuanCsv from '../data/yuan.dsv';


const propTypes = {
    // data: PropTypes.object.isRequired,
    animated: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    // easing: PropTypes.func.isRequired,
    steps: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    keyProp: PropTypes.string.isRequired,
    labelProp: PropTypes.string.isRequired,
    getChildren: PropTypes.func.isRequired,
    margins: PropTypes.shape({
        bottom: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        right: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired
    }).isRequired,
    nodeOffset: PropTypes.number.isRequired,
    nodeRadius: PropTypes.number.isRequired,
    circleProps: PropTypes.object.isRequired,
    gProps: PropTypes.object.isRequired,
    pathProps: PropTypes.object.isRequired,
    svgProps: PropTypes.object.isRequired,
    textProps: PropTypes.object.isRequired
};

const defaultProps = {
    height: 1500,
    width: 3500,
    animated: false,
    duration: 500,
    easing: 0.5,
    getChildren: n => n.children,
    steps: 20,
    keyProp: 'id',
    labelProp: 'id',
    margins: {
        bottom: 10,
        left: 20,
        right: 150,
        top: 10
    },
    nodeOffset: 3.5,
    nodeRadius: 5,
    circleProps: {},
    gProps: {
        className: 'node'
    },
    pathProps: {
        className: 'link'
    },
    svgProps: {
        className: 'custom'
    },
    textProps: {}
};

export default class D3FamilyTree extends Component {
    constructor(props) {
        super(props);
        this.state = { root: undefined, generations: undefined, persons: undefined };
    }

    componentDidMount() {
        var that = this;

        dsv("|", yuanCsv, function (d) {
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

            var hierarchyRoot = hierarchy(myRoot);

            var height = hierarchyRoot.height;
            // console.log("世代: " + (height + 1));

            var totalCount = 0;
            hierarchyRoot.each(function (d) {
                totalCount = totalCount + 1;
            });

            // console.log("总人数: " + totalCount);
            that.setState({
                root: myRoot,
                generations: height + 1,
                persons: totalCount
            });
        });
    }

    render() {

        if (this.state.root) {

            const contentWidth = this.props.width - this.props.margins.left - this.props.margins.right;
            const contentHeight = this.props.height - this.props.margins.top - this.props.margins.bottom;

            let data = hierarchy(this.state.root);
            let root = tree().size([contentHeight, contentWidth])(data);
            let nodes = root.descendants();
            let links = root.links();

            nodes.forEach(node => {
                node.y += this.props.margins.top;
            });

            return <div id="d3tree">
                <ReactSVGPanZoom style={{ outline: "1px solid red" }} width={1050} height={650} background='white' tool='auto'>
                    <svg {...this.props.svgProps} height={this.props.height} width={this.props.width}>
                        {links.map(link =>
                            <Link
                                key={link.target.data[this.props.keyProp]}
                                keyProp={this.props.keyProp}
                                source={link.source}
                                target={link.target}
                                x1={link.source.x}
                                x2={link.target.x}
                                y1={link.source.y}
                                y2={link.target.y}
                                pathProps={Object.assign({}, this.props.pathProps, link.target.data.pathProps)} />)
                        }
                        {nodes.map(node =>
                            <Node
                                key={node.data[this.props.keyProp]}
                                keyProp={this.props.keyProp}
                                labelProp={this.props.labelProp}
                                offset={this.props.nodeOffset}
                                radius={this.props.nodeRadius}
                                x={node.x}
                                y={node.y}
                                circleProps={Object.assign({}, this.props.circleProps, node.data.circleProps)}
                                gProps={Object.assign({}, this.props.gProps, node.data.gProps)}
                                textProps={Object.assign({}, this.props.textProps, node.data.textProps)}
                                {...node.data} />)
                        }
                    </svg>
                </ReactSVGPanZoom>
                <div>
                    本家谱（不完全版）目前世代数为: {this.state.generations}, 包含人数为: {this.state.persons}，时间跨度大约: {30 * this.state.generations}年
              </div>
            </div>
        } else {
            return <div>Loading...</div>;
        }


    }
}

D3FamilyTree.propTypes = propTypes;
D3FamilyTree.defaultProps = defaultProps;