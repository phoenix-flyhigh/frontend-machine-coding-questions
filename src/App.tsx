import React from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card>
        <Card.CardHeader
          heading="Dev tools"
          actions={[
            {
              label: "Subscribe",
              tooltip: "Click to subscribe",
              onClick: () => alert("Subscribed"),
            },
          ]}
        />
        <Card.CardContent
          tabs={{
            defaultActiveIndex: 1,
            panes: [
              { label: "About", pane: "About" },
              { label: "Channel", pane: "Channel" },
              { label: "Team", pane: "Team" },
            ],
          }}
        />
      </Card>
    </div>
  );
}

export default App;
