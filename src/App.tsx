import "./App.css";
import Accordion from "./components/Accordion";

function App() {
  return (
    <div className=" bg-black text-white h-screen w-full flex justify-center items-center">
      <Accordion defaultActive={1}>
        <Accordion.Item id={1}>
          <Accordion.Toggle>Whats dev tools tech</Accordion.Toggle>
          <Accordion.Panel>Whats dev tools tech</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item id={2}>
          <Accordion.Toggle>Is it Free?</Accordion.Toggle>
          <Accordion.Panel>
            Yes, the platform and YouTube both are completely free!
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item id={3}>
          <Accordion.Toggle>Take me there already</Accordion.Toggle>
          <Accordion.Panel>Take me there already</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default App;
