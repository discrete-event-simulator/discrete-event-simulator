export const settings = {
  "Wire": {
    "delay_dist": {
      "default": 0.1,
      "type": "number", // "text" for texts
      "required": true,
      "helperText": "a no-parameter function that returns the successive propagation delays on this wire."
    },
    "loss_dist": {
      "default": 0.1,
      "type": "number",
      "required": true,
      "helperText": "a function that takes one optional parameter, which is the packet ID, and returns the loss rate"
    },
  }
}
