from mimetypes import common_types
import sys
import string
import json
import copy
jsonString = sys.argv[1]

# x = json.loads(jsonString)
# print(x["components"][0]["name"])
# print(jsonString)


class CodeGenerator:

    def __init__(self, json_string) -> None:
        self.json_data = json.loads(json_string)
        self.code = []
        # import paths for different network components, add more later
        self.import_paths = {
            "DistPacketGenerator": "from ns.packet.dist_generator import DistPacketGenerator",
            "Wire": "from ns.port.wire import Wire",
            "PacketSink": "from ns.packet.sink import PacketSink",
            "Splitter": "from ns.utils.splitter import Splitter",
            "SimplePacketSwitch": "from ns.switch.switch import SimplePacketSwitch",
            "Packet": "from ns.packet.packet import Packet",
            "TracePacketGenerator": "from ns.packet.trace_generator import TracePacketGenerator",
            "TCPPacketGenerator": "from ns.packet.tcp_generator import TCPPacketGenerator",
            "ProxyPacketGenerator": "from ns.packet.proxy_generator import ProxyPacketGenerator",
            "TCPSink": "from ns.packet.tcp_sink import TCPSink",
            "ProxySink": "from ns.packet.proxy_sink import ProxySink",
            "Port": "from ns.port.port import Port",
            "REDPort": "from ns.port.red_port import REDPort",
            "NWaySplitter": "from ns.utils.splitter import NWaySplitter",
            "TrTCM": "from ns.utils.misc import TrTCM",
            "RandomDemux": "from ns.demux.random_demux import RandomDemux",
            "FlowDemux": "from ns.demux.flow_demux import FlowDemux",
            "FIBDemux": "from ns.demux.fib_demux import FIBDemux",
            "TokenBucketShaper": "from ns.shaper.token_bucket import TokenBucketShaper",
            "TwoRateTokenBucketShaper": "from ns.shaper.two_rate_token_bucket import TwoRateTokenBucketShaper",
            "SPServer": "from ns.scheduler.sp import SPServer",
            "WFQServer": "from ns.scheduler.wfq import WFQServer",
            "DRRServer": "from ns.scheduler.drr import DRRServer",
            "VirtualClockServer": "from ns.scheduler.virtual_clock import VirtualClockServer",
            "SimplePacketSwitch": "from ns.switch.switch import SimplePacketSwitch",
            "FairPacketSwitch": "from ns.switch.switch import FairPacketSwitch",
            "PortMonitor": "from ns.port.monitor import PortMonitor",
            "ServerMonitor": "from ns.scheduler.monitor import ServerMonitor",
            "Flow": "from ns.flow.flow import Flow",
            "TCPCubic": "from ns.flow.cubic import TCPCubic",
            "CongestionControl": "from ns.flow.cc import CongestionControl",
            "TCPReno": "from ns.flow.cc import TCPReno",
            "Timer": "from ns.utils.timer import Timer"
        }
        self.comp_dict = self.create_component_dict()
        self.connection_graph = self.create_component_connection_graph()

    # to generate a dictionary in the form of {(component_name): {dictionary of attributes}}
    def create_component_dict(self):
        comp_dict = {}
        components = self.json_data['components']
        for component in components:
            attributes = component['attributes']
            comp_dict[component['name']] = copy.deepcopy(attributes)
            comp_dict[component['name']]['type'] = component['type']

        return comp_dict

    # create a connection graph in the form of {(component_name): [list of components connecting to it]}
    def create_component_connection_graph(self):
        connections = self.json_data['connections']
        connection_graph = {}

        for connection in connections:

            child_node = connection['from']['name']
            parent_node = connection['to']['name']

            if parent_node not in connection_graph:
                connection_graph[parent_node] = []

            connection_graph[parent_node].append(child_node)

            if child_node not in connection_graph:
                connection_graph[child_node] = []

        return connection_graph

    def get_comp_dict(self):
        return self.comp_dict

    def get_connection_graph(self):
        return self.connection_graph

    # generate import statements at the beginning
    def generate_imports(self):
        self.code.append("import simpy")
        self.code.append("from random import expovariate")

        component_types = set()
        components = self.json_data['components']

        for component in components:
            component_types.add(component['type'])

        for type in component_types:
            self.code.append(self.import_paths[type])

        self.code.append("\n\n")

    def create_single_component(self, var_name, var_type, var_attributes):
        init_string = ''

        init_string += var_name + " = " + var_type + "("
        # splitter doesn't need the env as a constructor, most components need this
        if var_type == "Splitter":
            init_string += ")"
            return init_string
        if var_type not in ["Flow", "TCPCubic", "TCPReno"]:
            init_string += "env, "

        items = var_attributes.items()
        for attribute_name, attribute_value in items:
            # this is just a flag to indicate if a component has multiple port
            # not part of the component constructor
            if attribute_name == "multiple_ports":
                continue
            if list(items)[0][0] == attribute_name:  # if first element
                init_string += (attribute_name + "=")
            else:
                init_string += (", " + attribute_name + "=")
            # if its a distribution, pass a lambda function as param
            if "dist" in attribute_name:
                init_string += "lambda: " + str(attribute_value)
            elif "weight" in attribute_name:
                if "type" in attribute_value and attribute_value["type"] == "list":
                    init_string += str(attribute_value['data'])
                else:
                    init_string += str(attribute_value['data'])

            else:
                # If we want to reference another component
                # If we want to reference a Flow object that has variable name flow_1
                # can't do flow="flow_1", has to be flow=flow_1
                if type(attribute_value) is dict and "reference" in attribute_value:
                    init_string += str(attribute_value['reference'])
                else:
                    # if value is a string then we want a string inside a string
                    # ex: element_id="element_1" not element_id=element_1
                    # if value is not a string, we don't want it to be a string
                    # ex: flow_id=1 not flow_id="1"
                    if type(attribute_value) is str:
                        init_string += "\"{}\"".format(attribute_value)
                    else:
                        init_string += str(attribute_value)

        init_string += ")"
        return init_string

    # generate network component initializations
    def generate_components(self):
        components = self.json_data['components']

        for component in components:
            var_name = component['name']
            var_type = component['type']
            var_attributes = component['attributes']
            self.code.append(self.create_single_component(
                var_name, var_type, var_attributes))

        self.code.append("\n\n")

    # generate network component connections
    def generate_connections(self):
        connections = self.json_data['connections']
        for connection in connections:
            child_node = connection['from']
            parent_node = connection['to']
            child_node_name = child_node["name"]
            child_port = ""
            if "multiple_ports" in self.comp_dict[child_node_name]:
                # takes care the case where there can be multiple outputs
                # so something like out[2]
                component_type = self.comp_dict[child_node_name]['type']
                if component_type == "SimplePacketSwitch" or component_type == "FairPacketSwitch":
                    # special case for the packet switch, their out is .demux.outs[(port number)].out
                    child_port = "demux.outs[" + \
                        str(child_node["port"]) + "].out"
                else:
                    child_port = "outs[" + str(child_node["port"]) + "]"
            else:
                # defaults to out if not port is specified
                # else out might be named differently ex: for splitter its out1 out2
                child_port = "out" if "port" not in child_node else child_node["port"]

            connection_string = child_node["name"] + \
                "." + child_port + " = " + parent_node["name"]
            self.code.append(connection_string)

        self.code.append("\n\n")

    # generate the print statements that prints data in packetsink
    def generate_data_display(self):
        if "display_data" not in self.json_data:
            return
        display_data = self.json_data["display_data"]

        for component in display_data:
            component_name = component["name"]
            informations_needed = component["informations"]
            self.code.append(
                "print(\"Final Simulation Statistics for {}:\")\n".format(component_name))
            for info in informations_needed:
                self.code.append(
                    "print(\"Information Printed: {}\")".format(info))

                self.code.append(
                    "for flow_id in {}.{}.keys():".format(component_name, info)
                )
                self.code.append(
                    "\tprint(\"Flow: {{}}: \".format(flow_id) +\", \".join([\"{{:.2f}}\".format(x) for x in {}.{}[flow_id]]))\n"
                    .format(component_name, info)
                )

    def generate_file(self):
        self.generate_imports()
        self.code.append("env = simpy.Environment()\n\n")
        self.generate_components()
        self.generate_connections()
        self.code.append("env.run(until=100)\n\n")
        self.generate_data_display()

        generated_code = "\n".join(self.code)

        file = open("network_graph.py", 'w')
        file.write(generated_code)
        file.close()


# for testing only, comment out when push
# f = open('test.json')
# data = json.load(f)
# json_str = json.dumps(data)
# cg = CodeGenerator(json_str)
cg = CodeGenerator(jsonString)
cg.generate_file()
exec(open("network_graph.py").read())
