import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

import Recommendation from "../../util/Recommendation";

const Recommendations = props => {
  return (
    <Dialog open={props.status} onClose={props.toggle}>
      <DialogTitle>Recommendations</DialogTitle>
      <DialogContent style={{ paddingBottom: 25 }}>
        <Recommendation />
      </DialogContent>
    </Dialog>
  );
};

export default Recommendations;
