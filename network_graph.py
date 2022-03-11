import simpy
from random import expovariate
from ns.packet.tcp_generator import TCPPacketGenerator
from ns.flow.flow import Flow
from ns.flow.cubic import TCPCubic



env = simpy.Environment()


Flow_2 = Flow(fid=0, src="flow", dst="flow", finish_time=10, arrival_dist=lambda: 0.1, size_dist=lambda: 512)

TCPPacketGenerator_2 = TCPPacketGenerator(env, element_id="TCPPacketGenerator_2", flow=Flow_2, cc=TCPCubic())






env.run(until=100)

