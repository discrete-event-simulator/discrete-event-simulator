module.exports = function scriptBuilder(args) {
  const { dpgOut, wireOut, parameters } = args;

  const isPacketSinkIncluded = wireOut === 'PacketSink';

  const pythonScript = `

import simpy
from random import expovariate
import random
from ns.packet.dist_generator import DistPacketGenerator
${dpgOut === 'Wire' ? 'from ns.port.wire import Wire' : ''}
${isPacketSinkIncluded ? 'from ns.packet.sink import PacketSink' : ''}

env = simpy.Environment()

def arrival_1():
  """ Packets arrive with a constant interval of 1.5 seconds. """
  return ${parameters['DPG_1:arrival_dist'] || 1.5}
def arrival_2():
  """ Packets arrive with a constant interval of 2.0 seconds. """
  return ${parameters['DPG_2:arrival_dist'] || 1.5}

def delay_dist():
  return ${parameters['Wire_1:delay'] || 0.1}

def packet_size():
  return int(expovariate(0.01))

pg1 = DistPacketGenerator(env, "flow_1", arrival_1, packet_size, flow_id=0)
pg2 = DistPacketGenerator(env, "flow_2", arrival_2, packet_size, flow_id=1)

${
  isPacketSinkIncluded
    ? 'ps = PacketSink(env, rec_flow_ids=False, debug=True)'
    : ''
}

${
  wireOut
    ? `
wire1 = Wire(env, delay_dist, wire_id=1, debug=True)
wire2 = Wire(env, delay_dist, wire_id=2, debug=True)

pg1.out = wire1
pg2.out = wire2

${
  isPacketSinkIncluded
    ? `
wire1.out = ps
wire2.out = ps
`
    : ''
}
`
    : ''
}

env.run(until=100)

print("Flow 1 packet delays: " +
      ", ".join(["{:.2f}".format(x) for x in ps.waits['flow_1']]))
print("Flow 2 packet delays: " +
      ", ".join(["{:.2f}".format(x) for x in ps.waits['flow_2']]))

print("Packet arrival times in flow 1: " +
      ", ".join(["{:.2f}".format(x) for x in ps.arrivals['flow_1']]))

print("Packet arrival times in flow 2: " +
      ", ".join(["{:.2f}".format(x) for x in ps.arrivals['flow_2']]))

  `;

  return pythonScript;
};
