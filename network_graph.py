import simpy
from random import expovariate
from ns.port.wire import Wire
from ns.packet.dist_generator import DistPacketGenerator
from ns.scheduler.wfq import WFQServer



env = simpy.Environment()


WFQServer_3 = WFQServer(env, rate=0, zero_buffer=True, zero_downstream_buffer=True, debug=True)
DistPacketGenerator_4 = DistPacketGenerator(env, flow_id=4, element_id="4", arrival_dist=lambda: 0.1, size_dist=lambda: 0.1, initial_delay=0, finish=10000000, rec_flow=True)
Wire_5 = Wire(env, wire_id=5, delay_dist=lambda: 0.1, debug=True)






env.run(until=100)

