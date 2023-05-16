import './App.css'
import React, { useState } from 'react';
import type { Event as GraphEvent, INode, IEdge } from '@antv/event';
import Graphin, { Behaviors } from '@antv/graphin';

const { DragCanvas, ZoomCanvas } = Behaviors;

type Node = INode & {
  name: string,
}

interface Data {
  node: Node[],
  edges: IEdge[],
}

const data: Data = {
  nodes: [
    {
      id: '0',
      name: 'alice',
    },
    {
      id: '1',
      name: 'bob',
    },
  ],
  edges: [
    {
      source: '0',
      target: '1',
    },
  ],
}

function App() {
  const graphinRef = React.createRef();

  const [clickedNode, setClickedNode] = useState<string | null>(null);

  const handleNodeClick = (e: GraphEvent) => {
    const model = e.item.getModel() as Node;
    setClickedNode(model.name);
  };

  const handleCanvasClick = () => {
    setClickedNode(null);
  };

  React.useEffect(() => {
    const {
      graph, // g6 的Graph实例
    } = graphinRef.current;
    graph.on('node:click', handleNodeClick);
    graph.on('canvas:click', handleCanvasClick);
    return () => {
      graph.off('node:click', handleNodeClick);
      graph.off('canvas:click', handleCanvasClick);
    };
  }, [graphinRef]);

  return (
    <div className="app">
      <div className="graph">
        <Graphin data={data} ref={graphinRef}>
          <DragCanvas />
          <ZoomCanvas />
        </Graphin>
      </div>
      <div className="overview">
        <h2>Overview</h2>
        {clickedNode !== null ? (
          <p>The node '{clickedNode}' was clicked</p>
        ) : (
          <p>Try clicking a node!</p>
        )}
      </div>
    </div>
  );
}

export default App
