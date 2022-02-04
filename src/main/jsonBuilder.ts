export default function jsonBuilder(args: any) {
  const { dpgOut, wireOut, parameters, jsonData } = args;
  // can delete this function after, this is just for testing
  // before connecting to the actual frontend
  let data = {
    components: [
      {
        name: 'DPG_1',
        type: 'DistPacketGenerator',
        attributes: {
          element_id: 'flow1',
          arrival_dist: parameters['DPG_1:arrival_dist'],
          flow_id: 1,
          size_dist: 100,
        },
      },
      {
        name: 'DPG_2',
        type: 'DistPacketGenerator',
        attributes: {
          element_id: 'flow2',
          arrival_dist: parameters['DPG_2:arrival_dist'],
          flow_id: 1,
          size_dist: 200,
        },
      },
      {
        name: 'Wire_1',
        type: 'Wire',
        attributes: {
          delay_dist: parameters['Wire_1:delay'],
          wire_id: 1,
          debug: true,
        },
      },
      {
        name: 'Wire_2',
        type: 'Wire',
        attributes: {
          delay_dist: parameters['Wire_2:delay'],
          wire_id: 2,
          debug: true,
        },
      },
      {
        name: 'PacketSink_1',
        type: 'PacketSink',
        attributes: {
          rec_arrivals: true,
          absolute_arrivals: true,
          rec_waits: true,
          rec_flow_ids: false,
          debug: true,
        },
      },
    ],
    connections: [
      {
        from: {
          name: 'DPG_1',
        },
        to: {
          name: 'Wire_1',
        },
      },
      {
        from: {
          name: 'DPG_2',
        },
        to: {
          name: 'Wire_2',
        },
      },
      {
        from: {
          name: 'Wire_1',
        },
        to: {
          name: 'PacketSink_1',
        },
      },
      {
        from: {
          name: 'Wire_2',
        },
        to: {
          name: 'PacketSink_1',
        },
      },
    ],
    display_data: [
      {
        name: 'PacketSink_1',
        informations: ['waits', 'arrivals'],
      },
    ],
  };
  let networkJSON = JSON.stringify(jsonData ? jsonData : data);
  return networkJSON;
}
