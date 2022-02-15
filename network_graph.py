import simpy
from random import expovariate
from ns.packet.sink import PacketSink



env = simpy.Environment()


PacketSink_2 = PacketSink(env, rec_arrivals=True, absolute_arrivals=True, rec_waits=True, rec_flow_ids=True, debug=True)






env.run(until=100)


print("Final Simulation Statistics for PacketSink_2:")

print("Information Printed: waits")
for flow_id in PacketSink_2.waits.keys():
	print("Flow: {}: ".format(flow_id) +", ".join(["{:.2f}".format(x) for x in PacketSink_2.waits[flow_id]]))

print("Information Printed: arrivals")
for flow_id in PacketSink_2.arrivals.keys():
	print("Flow: {}: ".format(flow_id) +", ".join(["{:.2f}".format(x) for x in PacketSink_2.arrivals[flow_id]]))
