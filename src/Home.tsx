import { FC, memo } from "react";
import { useAppState, useDispatch } from "./AppContext";

const homeStyle = {
  background:
    "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const bigCounterText = {
  fontSize: "85px",
  color: "#fff",
};

const buttonStyle = {
  border: "none",
  padding: "15px",
  borderRadius: "10px",
  background: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
};

const textColor = {
  color: "#FFF",
  textShadow: "4px 4px 8px rgba(0,0,0,0.5)",
  fontSize: "30px",
};

const Home: FC = () => {
  const { isLoading } = useAppState();

  console.log("Home Component Rendered.");
  return (
    <div style={{ ...homeStyle, flexDirection: "column" }}>
      <p style={bigCounterText}>{isLoading ? "Loading..." : "Not Loading"}</p>
      <DirectChild />
    </div>
  );
};

const DirectChild: FC = memo(() => {
  console.log("DirectChild Component Rendered");

  return (
    <>
      <InnerChild />
    </>
  );
});
const InnerChild: FC = () => {
  const { count } = useAppState();
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch({
      type: "updateGlobal",
      fieldName: "count",
      payload: count + 1,
    });
  };

  console.log("InnerChild Component Rendered");
  return (
    <>
      <button onClick={handleOnClick} style={buttonStyle}>
        {count}
        <InnerInnerChild />
      </button>
    </>
  );
};

const InnerInnerChild = memo(() => {
  console.log("InnerInnerChild Component Rendered");
  return (
    <>
      <p style={textColor}>
        Check the console to see which component re-redender.
      </p>
      <p style={textColor}>
        DirectChild and InnerInnerChild are wrapped with React.memo
      </p>
    </>
  );
});

export default Home;
