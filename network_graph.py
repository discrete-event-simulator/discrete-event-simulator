import simpy
from random import expovariate
from ns.flow.cubic import TCPCubic
from ns.switch.switch import SimplePacketSwitch
from ns.flow.flow import Flow
from ns.packet.tcp_generator import TCPPacketGenerator



env = simpy.Environment()


TCP_Cubic_2 = TCPCubic()
Flow_2 = Flow(fid=0, finish_time=10, arrival_dist=lambda: 0.1, size_dist=lambda: 512, src="flow_2", dst="flow_2")
TCPPacketGenerator_2 = TCPPacketGenerator(env, element_id="2", flow=Flow_2, cc=TCP_Cubic_2)
SimplePacketSwitch_3 = SimplePacketSwitch(env, nports=1, port_rate=1, buffer_size=1, element_id="3", debug=True)



TCPPacketGenerator_2.out = SimplePacketSwitch_3



env.run(until=100)

