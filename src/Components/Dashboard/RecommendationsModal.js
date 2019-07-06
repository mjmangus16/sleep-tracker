import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

import RecommendationContent from "./RecommendationContent";

const Recommendations = props => {
  return (
    <Dialog open={props.status} onClose={props.toggle}>
      <DialogTitle>Recommendations</DialogTitle>
      <DialogContent style={{ paddingBottom: 25 }}>
        <RecommendationContent />
      </DialogContent>
    </Dialog>
  );
};

export default Recommendations;
