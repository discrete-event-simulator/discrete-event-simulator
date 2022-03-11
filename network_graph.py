import simpy
from random import expovariate
from ns.packet.tcp_generator import TCPPacketGenerator
from ns.flow.cubic import TCPCubic
from ns.flow.flow import Flow



env = simpy.Environment()


Flow_3 = Flow(fid=0, src="flow", dst="flow", finish_time=10, arrival_dist=lambda: 0.1, size_dist=lambda: 512)
TCPPacketGenerator_2 = TCPPacketGenerator(env, flow=Flow_3, cc=TCPCubic(), element_id="flow2")






env.run(until=100)

