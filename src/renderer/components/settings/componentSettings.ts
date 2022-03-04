export const displays = ['PacketSink', 'ProxySink', 'TCPSink'];
export const allComponents = [
  'Wire',
  'DistPacketGenerator',
  'PacketSink',
  'TCPPacketGenerator',
  'TCPSink',
  'PacketSwitch',
  'Flow',
  'CongestionControl',
  'TCPCubic',
  'Packet',
  'ProxyPacketGenerator',
  'ProxySink',
  'TracePacketGenerator',
  'Port',
  'REDPort',
  'DRRServer',
  'ServerMonitor',
  'SPServer',
  'VirtualClockServer',
  'WFQServer',
  'TokenBucketShaper',
  'TwoRateTokenBucketShaper',
  'TrTCM',
  'Splitter',
  'Timer',
];
export const whiteListComponents = [
  'Wire',
  'DistPacketGenerator',
  'PacketSink',
  'TCPPacketGenerator',
  'TCPSink',
  'PacketSwitch',
  'Packet',
  'ProxyPacketGenerator',
  'ProxySink',
  'TracePacketGenerator',
  'Port',
  'REDPort',
  'DRRServer',
  'ServerMonitor',
  'SPServer',
  'VirtualClockServer',
  'WFQServer',
  'TokenBucketShaper',
  'TwoRateTokenBucketShaper',
  'TrTCM',
  'Splitter',
  'Timer',
];
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
      type: 'float',
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
      helperText: 'The ID of flow that serves as the source.',
    },
    element_id: {
      default: '',
      type: 'text',
      required: true,
      helperText: 'The ID of this element.',
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
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'Are we recording the statistics of packets generated?',
    },
  },

  TracePacketGenerator: {
    flow_id: {
      default: 0,
      type: 'int',
      required: true,
      immutable: true,
      helperText: 'The ID of flow that serves as the source.',
    },
    element_id: {
      default: '',
      type: 'text',
      required: true,
      helperText: 'the ID of this element.',
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
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'Are we recording the statistics of packets generated?',
    },
    debug: {
      default: true,
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
      default: 0,
      type: 'int',
      required: true,
      helperText: 'The ID of flow that serves as the source.',
    },
    element_id: {
      default: '',
      type: 'text',
      required: true,
      helperText: 'The ID for this element.',
    },
    rec_flow: {
      default: true,
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
        "otherwise, the 'src' field in the packets are used. ",
    },
    debug: {
      default: false,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  Flow: {
    // pkt_gen, pkt_sink, path
    fid: {
      default: 1,
      type: 'int',
      required: true,
      helperText: 'flow id',
    },
    src: {
      default: '',
      type: 'text',
      required: true,
      helperText: 'source element',
    },
    dst: {
      default: '',
      type: 'text',
      required: true,
      helperText: 'destination element',
    },
    size: {
      default: '',
      type: 'int',
      required: true,
      helperText: 'flow size in bytes',
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
      helperText: 'packet arrival distribution',
    },
    size_dist: {
      default: 512,
      type: 'float',
      required: true,
      helperText: 'packet size distribution',
    },
  },

  CongestionControl: {
    mss: {
      default: 512,
      type: 'int',
      required: true,
      helperText: 'the maximum segment size',
    },
    cwnd: {
      default: 512,
      type: 'int',
      required: true,
      helperText: 'the size of the congestion window',
    },
    ssthresh: {
      default: 65535,
      type: 'int',
      required: true,
      helperText: 'the slow start threshold',
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  TCPCubic: {
    mss: {
      default: 512,
      type: 'int',
      required: true,
      helperText: 'the maximum segment size',
    },
    cwnd: {
      default: 512,
      type: 'int',
      required: true,
      helperText: 'the size of the congestion window',
    },
    ssthresh: {
      default: 65535,
      type: 'int',
      required: true,
      helperText: 'the slow start threshold',
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  Packet: {
    time: {
      default: 1,
      type: 'float',
      required: true,
      helperText: 'the time when the packet is generated',
    },
    size: {
      default: 1,
      type: 'float',
      required: true,
      helperText: 'the size of the packet in bytes',
    },
    packet_id: {
      default: 0,
      type: 'int',
      required: true,
      helperText: 'an identifier for the packet',
    },
    src: {
      default: 0,
      type: 'int',
      required: true,
      helperText: 'identifiers for the source',
    },
    dst: {
      default: 0,
      type: 'int',
      required: true,
      helperText: 'identifiers for the destination',
    },
    flow_id: {
      default: 0,
      type: 'int',
      required: true,
      helperText: 'an integer that can be used to identify a flow',
    },
  },

  ProxyPacketGenerator: {
    element_id: {
      default: '',
      type: 'text',
      required: true,
      helperText:
        'a string that serves as the ID of this element for debugging purposes',
    },
    listen_port: {
      default: 3000,
      type: 'int',
      required: true,
      helperText: 'the listening point for new connections',
    },
    packet_size: {
      default: 40960,
      type: 'int',
      required: true,
      helperText: 'the size of each packet when receiving real-world traffic',
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  ProxySink: {
    element_id: {
      default: '',
      type: 'text',
      required: true,
      helperText:
        'a string that serves as the ID of this element for debugging purposes',
    },
    destination_hostname: {
      // destination tuple
      default: '',
      type: 'text',
      required: true,
      helperText:
        'the hostname of the real-world destination server where packets should be relayed to',
    },
    destination_port: {
      default: 0,
      type: 'int',
      required: true,
      helperText:
        'the port number of the real-world destination server where packets should be relayed to',
    },
    packet_size: {
      default: 40960,
      type: 'int',
      required: true,
      helperText: 'the size of each packet when receiving real-world traffic',
    },
    rec_arrivals: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, arrivals will be recorded.',
    },
    absolute_arrivals: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'If True absolute `arrival times will be recorded, otherwise the time between consecutive arrivals is recorded.',
    },
    rec_waits: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'If True, the waiting times experienced by the packets are recorded.',
    },
    rec_flow_ids: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        "if True, the flow IDs that the packets are used as the index for recording; otherwise, the 'src' field in the packets are used",
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  Port: {
    rate: {
      default: 0,
      type: 'float',
      required: true,
      helperText: 'the bit rate of the port (0 for unlimited)',
    },
    element_id: {
      default: 0,
      type: 'int',
      required: true,
      helperText: 'the element id of this port',
    },
    qlimit: {
      // can be None (no limit)
      default: 10000000,
      type: 'int',
      required: true,
      helperText:
        'a queue limit in bytes or packets (including the packet in service), beyond which all packets will be dropped.',
    },
    limit_bytes: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'If True, the queue limit will be based on bytes; if False, the queue limit will be based on packets.',
    },
    zero_downstream_buffer: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        "If True, assume that the downstream element does not have any buffers, and backpressure is in effect so that all waiting packets queue up in this element's buffer.",
    },
    absolute_arrivals: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'If True absolute `arrival times will be recorded, otherwise the time between consecutive arrivals is recorded.',
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  REDPort: {
    rate: {
      default: 0,
      type: 'float',
      required: true,
      helperText: 'the bit rate of the port (0 for unlimited)',
    },
    element_id: {
      default: 0,
      type: 'int',
      required: true,
      helperText: 'the element id of this port',
    },
    qlimit: {
      // can be None (no limit)
      default: 10000000,
      type: 'int',
      required: true,
      helperText:
        'a queue limit in bytes or packets (including the packet in service), beyond which all packets will be dropped.',
    },
    max_threshold: {
      default: 10000000,
      type: 'int',
      required: true,
      helperText:
        'The maximum (average) queue length threshold, beyond which packets will be dropped at the maximum probability.',
    },
    min_threshold: {
      default: 1,
      type: 'int',
      required: true,
      helperText:
        'The minimum (average) queue length threshold to start dropping packets. This threshold should be set high enough to maximize the link utilization. ' +
        'If the minimum threshold is too low, packets may be dropped unnecessarily, and the transmission link will not be fully used.',
    },
    max_probability: {
      default: 1,
      type: 'float',
      required: true,
      helperText:
        'The maximum probability (which is equivalent to 1 / mark probability denominator) ' +
        'is the fraction of packets dropped when the average queue length is at the ' +
        "maximum threshold, which is 'max_threshold'. The rate of packet drop increases " +
        'linearly as the average queue length increases, until the average queue length ' +
        "reaches the maximum threshold, 'max_threshold'. All packets will be dropped when " +
        "'qlimit' is exceeded.",
    },
    weight_factor: {
      default: 9,
      type: 'float',
      required: true,
      helperText:
        "The exponential weight factor 'n' for computing the average queue size. " +
        'average = (old_average * (1-1/2^n)) + (current_queue_size * 1/2^n)',
    },
    limit_bytes: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'If True, the queue limit will be based on bytes; if False, the queue limit will be based on packets.',
    },
    zero_downstream_buffer: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        "If True, assume that the downstream element does not have any buffers, and backpressure is in effect so that all waiting packets queue up in this element's buffer.",
    },
    absolute_arrivals: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'If True absolute `arrival times will be recorded, otherwise the time between consecutive arrivals is recorded.',
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  DRRServer: {
    // weights, flow_classes
    rate: {
      default: 0,
      type: 'float',
      required: true,
      helperText: 'the bit rate of the port',
    },
    zero_buffer: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'Does this server have a zero-length buffer? This is useful when multiple basic elements need to be put together to construct a more complex element with a unified buffer.',
    },
    zero_downstream_buffer: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        "Does this server's downstream element have a zero-length buffer? If so, packets may queue up in this element's own buffer rather than be forwarded to the next-hop element.",
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  ServerMonitor: {
    // server, dist, total_flows
    /*
      To be compatible with this monitor, the scheduling server will need to implement three
      callback functions:

      packet_in_service() -> Packet: returns the current packet being sent to the downstream node
      byte_size(flow_id) -> int: returns the queue length in bytes for a flow with a
      particular flow ID
      size(flow_id) -> int: returns the queue length in the number of packets for a
      flow with a particular flow ID
      all_flows -> list: returns a list containing all the flow IDs
    */
    pkt_in_service_included: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'If True, monitor packets in service + in the queue; if False, only monitor packets in queue.',
    },
  },

  SPServer: {
    // priorities, flow_classes
    rate: {
      default: 0,
      type: 'float',
      required: true,
      helperText: 'the bit rate of the port',
    },
    zero_buffer: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'Does this server have a zero-length buffer? This is useful when multiple basic elements need to be put together to construct a more complex element with a unified buffer.',
    },
    zero_downstream_buffer: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        "Does this server's downstream element have a zero-length buffer? If so, packets may queue up in this element's own buffer rather than be forwarded to the next-hop element.",
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  VirtualClockServer: {
    // vticks, flow_classes
    rate: {
      default: 0,
      type: 'float',
      required: true,
      helperText: 'the bit rate of the port',
    },
    zero_buffer: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'Does this server have a zero-length buffer? This is useful when multiple basic elements need to be put together to construct a more complex element with a unified buffer.',
    },
    zero_downstream_buffer: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        "Does this server's downstream element have a zero-length buffer? If so, packets may queue up in this element's own buffer rather than be forwarded to the next-hop element.",
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  WFQServer: {
    // weights, flow_classes
    rate: {
      default: 0,
      type: 'float',
      required: true,
      helperText: 'the bit rate of the port',
    },
    zero_buffer: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'Does this server have a zero-length buffer? This is useful when multiple basic elements need to be put together to construct a more complex element with a unified buffer.',
    },
    zero_downstream_buffer: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        "Does this server's downstream element have a zero-length buffer? If so, packets may queue up in this element's own buffer rather than be forwarded to the next-hop element.",
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  TokenBucketShaper: {
    rate: {
      default: 0,
      type: 'float',
      required: true,
      helperText: 'the bit rate of the port',
    },
    bucket_size: {
      default: 1,
      type: 'int',
      required: true,
      helperText: 'the token bucket size in bytes',
    },
    peak: {
      // can be None (infinite peak sending rate)
      default: 10000000,
      type: 'int',
      required: true,
      helperText:
        'the peak sending rate in bits of the buffer (quickest time two packets could be sent)',
    },
    zero_buffer: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'Does this server have a zero-length buffer? This is useful when multiple basic elements need to be put together to construct a more complex element with a unified buffer.',
    },
    zero_downstream_buffer: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        "Does this server's downstream element have a zero-length buffer? If so, packets may queue up in this element's own buffer rather than be forwarded to the next-hop element.",
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  TwoRateTokenBucketShaper: {
    cir: {
      default: 1,
      type: 'int',
      required: true,
      helperText: 'the Committed Information Rate (CIR) in bits',
    },
    cbs: {
      default: 1,
      type: 'int',
      required: true,
      helperText: 'the Committed Burst Size (CBS) in bytes',
    },
    pir: {
      default: 1,
      type: 'int',
      required: true,
      helperText: 'the Peak Information Rate (CIR) in bits',
    },
    pbs: {
      default: 1,
      type: 'int',
      required: true,
      helperText: 'the Peak Burst Size (PBS) in bytes',
    },
    zero_buffer: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        'Does this server have a zero-length buffer? This is useful when multiple basic elements need to be put together to construct a more complex element with a unified buffer.',
    },
    zero_downstream_buffer: {
      default: true,
      type: 'boolean',
      required: true,
      helperText:
        "Does this server's downstream element have a zero-length buffer? If so, packets may queue up in this element's own buffer rather than be forwarded to the next-hop element.",
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  PacketSwitch: {
    nports: {
      default: 1,
      type: 'int',
      required: true,
      helperText: 'the total number of ports on this switch',
    },
    port_rate: {
      default: 1,
      type: 'float',
      required: true,
      helperText: 'the bit rate of the port',
    },
    buffer_size: {
      default: 1,
      type: 'int',
      required: true,
      helperText: "the size of an outgoing port' bounded buffer, in packets",
    },
    element_id: {
      default: '',
      type: 'text',
      required: false,
      helperText: 'the element ID of this component',
    },
    debug: {
      default: true,
      type: 'boolean',
      required: true,
      helperText: 'If True, prints more verbose debug information.',
    },
  },

  TrTCM: {
    pir: {
      default: 1,
      type: 'int',
      required: true,
      helperText:
        'the Peak Information Rate in units of bits (slighly different from RFC)',
    },
    pbs: {
      default: 1,
      type: 'int',
      required: true,
      helperText: 'the Peak Burst Size in units of bytes',
    },
    cir: {
      default: 1,
      type: 'int',
      required: true,
      helperText: 'the Committed Information Rate in units of bits',
    },
    cbs: {
      default: 1,
      type: 'int',
      helperText: 'the Committed Burst Size in bytes',
    },
  },

  Timer: {
    // timeout_callback
    timer_id: {
      default: 1,
      type: 'int',
      required: true,
      helperText:
        'The id of this timer, used as a parameter when the timeout callback function is called',
    },
    timeout: {
      default: 1,
      type: 'float',
      helperText: 'the timeout value',
    },
  },
};
