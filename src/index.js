import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect, Group, Text } from "react-konva";

function generateDocs() {
  return [...Array(5)].map((_, i) => ({
    id: i.toString(),
    x: 100 + i * 160, // initial x position
    y: 70 + i * 60, // initial y position
    text: `Document ${i + 1}`,
  }));
}

const App = () => {
  const [docs, setDocs] = useState(generateDocs());
  const [expandedDoc, setExpandedDoc] = useState(null);

  const handleDragMove = (e, id) => {
    const { x, y } = e.target.position();
    setDocs(docs.map((doc) => (doc.id === id ? { ...doc, x, y } : doc)));
  };

  const handleInputChange = (id, value) => {
    setDocs(docs.map((doc) => (doc.id === id ? { ...doc, text: value } : doc)));
  };

  const handleExpand = (doc) => {
    setExpandedDoc(doc);
  };

  const handleUnexpand = () => {
    setExpandedDoc(null);
  };

  if (expandedDoc) {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <textarea
          value={expandedDoc.text}
          onChange={(e) => handleInputChange(expandedDoc.id, e.target.value)}
          style={{
            width: "100%",
            height: "100%",
            fontSize: "16px",
            padding: "10px",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleUnexpand}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {docs.map((doc) => (
            <Group
              key={doc.id}
              draggable
              onDragMove={(e) => handleDragMove(e, doc.id)}
              id={doc.id}
              x={doc.x}
              y={doc.y}
            >
              <Rect width={150} height={100} fill="lightblue" shadowBlur={5} />
              <Rect
                x={5} // Positioned on the left side of the document rectangle
                y={40}
                width={20}
                height={20}
                fill="gray"
                opacity={0.5}
                cornerRadius={5}
              />
              <Text
                text="Expand"
                fontSize={14}
                x={-30} // Adjusted x to show above and attached to the document
                y={-20} // Adjusted y to show above the document
                onClick={() => handleExpand(doc)}
              />
            </Group>
          ))}
        </Layer>
      </Stage>
      {docs.map((doc) => (
        <textarea
          id={`textarea-${doc.id}`}
          key={doc.id}
          value={doc.text}
          onChange={(e) => handleInputChange(doc.id, e.target.value)}
          style={{
            position: "absolute",
            left: `${doc.x}px`,
            top: `${doc.y}px`,
            width: "130px",
            minHeight: "50px",
            textAlign: "left",
            border: "1px solid #ccc",
            fontSize: "15px",
            padding: "5px",
            overflowY: "hidden",
            resize: "none",
          }}
        />
      ))}
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
