import logging from "../../config/logging";
import { RequestType, ResponseType } from "common";

import Product from "../../models/product";

module.exports = (req: RequestType, res: ResponseType) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => {
      res.status(200).json({ product });
    })
    .catch((error: Error) => {
      logging.error(`Error: ${error}`);
      res.status(500).json({
        message: "Error trying to get the product.",
      });
    });
};
