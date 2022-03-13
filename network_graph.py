import simpy
from random import expovariate
from ns.packet.sink import PacketSink
from ns.packet.dist_generator import DistPacketGenerator
from ns.utils.splitter import Splitter
from ns.port.wire import Wire



env = simpy.Environment()


DistPacketGenerator_2 = DistPacketGenerator(env, flow_id=2, element_id="flow2", arrival_dist=lambda: 0.1, size_dist=lambda: 0.1, initial_delay=0, finish=10000000, rec_flow=True)
Splitter_3 = Splitter()
Wire_4 = Wire(env, wire_id=4, delay_dist=lambda: 0.1, debug=True)
Wire_5 = Wire(env, wire_id=5, delay_dist=lambda: 0.1, debug=True)
PacketSink_6 = PacketSink(env, rec_arrivals=True, absolute_arrivals=True, rec_waits=True, rec_flow_ids=True, debug=True)



DistPacketGenerator_2.out = Splitter_3
Splitter_3.out1 = Wire_4
Splitter_3.out2 = Wire_5
Wire_4.out = PacketSink_6
Wire_5.out = PacketSink_6



env.run(until=100)


print("Final Simulation Statistics for PacketSink_6:")

print("Information Printed: waits")
for flow_id in PacketSink_6.waits.keys():
	print("Flow: {}: ".format(flow_id) +", ".join(["{:.2f}".format(x) for x in PacketSink_6.waits[flow_id]]))

print("Information Printed: arrivals")
for flow_id in PacketSink_6.arrivals.keys():
	print("Flow: {}: ".format(flow_id) +", ".join(["{:.2f}".format(x) for x in PacketSink_6.arrivals[flow_id]]))
