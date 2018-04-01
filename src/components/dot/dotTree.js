import React, { Component } from 'react';
import Viz from 'viz.js';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
import Image2 from './testSvgXml.svg';

export default class DotTree extends Component {

    render() {

        var parser = new DOMParser();
        var dotString = `
        graph Test 
        {
        size="50,20";            
        /* layout / format */
            rankdir = BT;               // bottoms to top
            splines = ortho;            // edges orthogonal
            center = true;              // page center
            edge [ penwidth = 2 ];      // edge thickness
            node [ width = 1.1 ];       // conistent node size
        
        /* node and edge definitions as produced by the script (?) */
            NodeFemale1 [label = Female1];
            NodeMale1 [label = Male1];
            ConnectionFemale1Male1 [shape = box, label = "", height = 0, width = 1, margin = 0, penwidth = 1];
            // 1 NodeFemale1 -- ConnectionFemale1Male1 -- NodeMale1 [weight = 100, penwidth = 2];
            ConnectionChildren11 [shape = box, label = "", height = 0, width = 0, margin = 0, penwidth = 1];
            // 2 ConnectionFemale1Male1 -- ConnectionChildren11 [penwidth = 2];
            NodeFemale2 [label = Female2];
            NodeMale2 [label = Male2];
            ConnectionFemale2Male2 [shape = box, label = "", height = 0, width = 0, margin = 0, penwidth = 1];
            // 3 NodeFemale2 -- ConnectionFemale2Male2 -- NodeMale2 [weight = 100, penwidth = 2];
            // 4 ConnectionChildren11 -- NodeMale2 [penwidth = 2];
            ConnectionChildren22 [shape = box, label = "", height = 0, width = 0, margin = 0, penwidth = 1];
            // 5 ConnectionFemale2Male2 -- ConnectionChildren22 [penwidth = 2];
            NodeMale3 [label = Male3];
            // 6 ConnectionChildren22 -- NodeMale3 [weight = 10, penwidth = 2];
            NodeFemale3 [label = Female3];
            // 7 ConnectionChildren22 -- NodeFemale3 [penwidth = 2];
            NodeMaleX [label = MaleX];
            // 8 ConnectionChildren11 -- NodeMaleX [weight = 10, penwidth = 2];
            NodeFemale4 [label = Female4];
            NodeMale4 [label = Male4];
            NodeMale5 [label = Male5];
            ConnectionFemale4Male4 [shape = box, label = "", height = 0, width = 0, margin = 0, penwidth = 1];
            // 9 NodeFemale4 -- ConnectionFemale4Male4 -- NodeMale4 [weight = 100, penwidth = 2];
            ConnectionMale4Male5 [shape = box, label = "", height = 0, width = 0, margin = 0, penwidth = 1];
            // 10 NodeMale4 -- ConnectionMale4Male5 -- NodeMale5 [weight = 100, penwidth = 2];
            // 11 ConnectionChildren11 -- NodeFemale4 [penwidth = 2];
            ConnectionChildren44 [shape = box, label = "", height = 0, width = 0, margin = 0, penwidth = 1];
            // 12 ConnectionFemale4Male4 -- ConnectionChildren44 [penwidth = 2];
            NodeFemale6 [label = Female6];
            // 13 ConnectionChildren44 -- NodeFemale6 [weight = 10, penwidth = 2];
            NodeFemale7 [label = Female7];
            // 14 ConnectionChildren44 -- NodeFemale7 [penwidth = 2];
            ConnectionChildren45 [shape = box, label = "", height = 0, width = 0, margin = 0, penwidth = 1];
            // 15 ConnectionMale4Male5 -- ConnectionChildren45 [penwidth = 2];
            NodeFemale8 [label = Female8];
            // 16 ConnectionChildren45 -- NodeFemale8 [penwidth = 2];
        
        /* family / generation subgraphs */
            subgraph cluster0
            {
                style = filled;
                fillcolor = lightgrey;
                color = white;
                { rank = same; NodeFemale1; ConnectionFemale1Male1; NodeMale1 }
                NodeFemale1 -- ConnectionFemale1Male1 -- NodeMale1;
            }
        
            ConnectionFemale1Male1 -- ConnectionChildren11;
        
            subgraph cluster1
            {
                { rank = same; NodeMale2; ConnectionFemale2Male2; NodeFemale2 }
                NodeFemale2 -- ConnectionFemale2Male2 -- NodeMale2;
            }
        
            ConnectionChildren11 -- NodeMale2;
        
            subgraph cluster2
            {
                NodeMaleX;
            }
        
            ConnectionChildren11 -- NodeMaleX;
        
            subgraph cluster3
            {
                { rank = same; NodeFemale4; NodeMale4; NodeMale5; ConnectionFemale4Male4; ConnectionMale4Male5 }
                NodeFemale4 -- ConnectionFemale4Male4 -- NodeMale4 -- ConnectionMale4Male5 -- NodeMale5;
            }
        
            ConnectionChildren11 -- NodeFemale4;
        
            subgraph cluster4
            {
                color = white;
                { rank = same; NodeMale3; NodeFemale3 }
            }
        
            ConnectionFemale2Male2 --ConnectionChildren22;
            ConnectionChildren22 -- { NodeMale3 NodeFemale3 };
        
            subgraph cluster5
            {
                color = white;
                { rank = same; NodeFemale6; NodeFemale7 }
            }
        
            ConnectionFemale4Male4 --ConnectionChildren44;
            ConnectionChildren44 -- { NodeFemale6 NodeFemale7 };
        
            subgraph cluster6
            {
                color = white;
                NodeFemale8;
            }
        
            ConnectionMale4Male5 --ConnectionChildren45;
            ConnectionChildren45 -- NodeFemale8;
        } 
        `;
        var svgXml = Viz(dotString);
        console.log(svgXml);
        const svg = parser.parseFromString(svgXml, "image/svg+xml").documentElement;
        // console.log(svg.innerHTML);

        return <div>
            <Image2/>
            {/* <ReactSVGPanZoom style={{ outline: "1px solid red" }} width={1050} height={650} background='white' tool='auto'> */}
                {/* <svg width={1400} height={700} dangerouslySetInnerHTML={{ __html: svg.innerHTML }} /> */}
               {/* </ReactSVGPanZoom> */}
        </div>
    }
}