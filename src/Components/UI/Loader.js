import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
const Loader = (props) => {
  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
        {props.hasError && (
          <div style={{ margin: "10px", display: "block" }}>
            Connection Error
          </div>
        )}
      </Backdrop>
    </React.Fragment>
  );
};
export default Loader;
