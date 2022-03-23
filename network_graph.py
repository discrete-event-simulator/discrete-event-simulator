import simpy
from random import expovariate
from ns.switch.switch import SimplePacketSwitch
from ns.port.wire import Wire
from ns.packet.tcp_sink import TCPSink
from ns.flow.cubic import TCPCubic
from ns.packet.tcp_generator import TCPPacketGenerator
from ns.flow.flow import Flow
from ns.flow.cubic import TCPCubic
from ns.flow.flow import Flow


env = simpy.Environment()


flow_1 = Flow(fid=0, src="flow 1", dst="flow 1", finish_time=10,
              arrival_dist=lambda: 0.1, size_dist=lambda: 512)
tcpCubic_1 = TCPCubic(mss=512, cwnd=512, ssthresh=65535, debug=False)
sender = TCPPacketGenerator(
    env, flow=flow_1, cc=tcpCubic_1, rtt_estimate=0.5, debug=True)
wire1_downstream = Wire(env, delay_dist=lambda: 0.1)
wire1_upstream = Wire(env, delay_dist=lambda: 0.1)
wire2_downstream = Wire(env, delay_dist=lambda: 0.1)
wire2_upstream = Wire(env, delay_dist=lambda: 0.1)
switch = SimplePacketSwitch(
    env, nports=2, port_rate=16384, buffer_size=5, debug=True)
receiver = TCPSink(env, rec_waits=True, debug=True)


sender.out = wire1_downstream
wire1_downstream.out = switch
wire2_downstream.out = receiver
receiver.out = wire2_upstream
wire2_upstream.out = switch
switch.demux.outs[0].out = wire2_downstream
switch.demux.outs[1].out = wire1_upstream
wire1_upstream.out = sender


env.run(until=100)
