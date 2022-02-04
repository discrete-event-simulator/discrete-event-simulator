export const displays = ['PacketSink'];
export const settings = {
  Wire: {
    wire_id: {
      default: 0,
      type: 'int',
      required: true,
      immutable: true,
      helperText: 'the ID of this element.',
    },
    delay_dist: {
      default: 0.1,
      type: 'float', // "text" for texts
      required: true,
      helperText:
        'a no-parameter function that returns the successive propagation delays on this wire.',
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
    /*
    loss_dist: {
      default: 0.1,
      type: 'float',
      required: true,
      helperText:
        'a function that takes one optional parameter, which is the packet ID, and returns the loss rate',
    },
    */
  },

  DistPacketGenerator: {
    flow_id: {
      default: 0,
      type: 'int',
      required: true,
      immutable: true,
      helperText: 'the ID of this element.',
    },
    element_id: {
      immutable: true,
      default: '',
      type: 'text',
      required: true,
      helperText: 'the ID of this element.',
    },
    arrival_dist: {
      default: 0.1,
      type: 'float',
      required: true,
      helperText:
        'A no-parameter function that returns the successive inter-arrival times of the packets.',
    },
    size_dist: {
      default: 0.1,
      type: 'float',
      required: true,
      helperText:
        'A no-parameter function that returns the successive sizes of the packets.',
    },
    initial_delay: {
      default: 0,
      type: 'float',
      required: true,
      helperText: 'Starts generation after an initial delay. Defaults to 0.',
    },
    finish: {
      default: 10000000,
      type: 'float',
      required: true,
      helperText: 'Stops generation at the finish time. Defaults to infinite.',
    },
    rec_flow: {
      default: 'true',
      type: 'boolean',
      required: true,
      helperText: 'Are we recording the statistics of packets generated?',
    },
  },

  PacketSink: {
    rec_arrivals: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'if True, arrivals will be recorded',
    },
    absolute_arrivals: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'if True absolute arrival times will be recorded, ' +
        'otherwise the time between consecutive arrivals is recorded.',
    },
    rec_waits: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'if True, the waiting times experienced by the packets are recorded',
    },
    rec_flow_ids: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'if True, the flow IDs that the packets are used as the index for recording; ' +
        "otherwise, the 'src' field in the packets are used",
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  TCPPacketGenerator: {
    flow_id: {
      default: 1,
      type: 'int',
      required: true,
      helperText: 'The id of flow that serves as the source.',
    },
    element_id: {
      default: '',
      type: 'text',
      required: true,
      helperText: 'The ID for this element.',
    },
    rec_flow: {
      default: 'true',
      type: 'boolean',
      required: true,
      helperText: 'Are we recording the statistics of packets generated?',
    },
  },

  TCPSink: {
    rec_arrivals: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'if True, arrivals will be recorded',
    },
    absolute_arrivals: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'if True absolute arrival times will be recorded, ' +
        'otherwise the time between consecutive arrivals is recorded.',
    },
    rec_waits: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'if True, the waiting times experienced by the packets are recorded',
    },
    rec_flow_ids: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'if True, the flow IDs that the packets are used as the index for recording; ' +
        "otherwise, the 'src' field in the packets are used",
    },
    debug: {
      default: false,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  SimplePacketSwitch: {
    nports: {
      default: 1,
      type: 'int',
      required: true,
      helperText: 'the total number of ports on this switch.',
    },
    port_rate: {
      default: 0.1,
      type: 'float',
      required: true,
      helperText: 'the bit rate of the port.',
    },
    buffer_size: {
      default: 1,
      type: 'int',
      required: true,
      helperText: "the size of an outgoing port' bounded buffer, in packets.",
    },
    element_id: {
      default: '',
      type: 'text',
      required: true,
      helperText: 'The (optional) element ID of this component.',
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  Flow: {
    fid: {
      default: 1,
      type: 'int',
      required: true,
      helperText: '',
    },
    src: {
      default: '',
      type: 'text',
      required: true,
      helperText: '',
    },
    dst: {
      default: '',
      type: 'text',
      required: true,
      helperText: '',
    },
    size: {
      default: '',
      type: 'int',
      required: true,
      helperText: '',
    },
    start_time: {
      default: '',
      type: 'float',
      required: true,
      helperText: '',
    },
    finish_time: {
      default: '',
      type: 'float',
      required: true,
      helperText: '',
    },
    arrival_dist: {
      default: 0.1,
      type: 'float',
      required: true,
      helperText: '',
    },
    size_dist: {
      default: 512,
      type: 'float',
      required: true,
      helperText: '',
    },
  },

  TCPCubic: {
    mss: {
      default: 512,
      type: 'int',
      required: true,
      helperText: '',
    },
    cwnd: {
      default: 512,
      type: 'int',
      required: true,
      helperText: '',
    },
    ssthresh: {
      default: 65535,
      type: 'int',
      required: true,
      helperText: '',
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: '',
    },
  },
};
