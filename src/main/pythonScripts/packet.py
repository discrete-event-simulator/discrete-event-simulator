import os

import sys

cwd = os.getcwd()

# TODO: This is a very hacky way to import relatively. This should be removed
sys.path.append(cwd + '/../../../ns.py/')

from ns.packet.packet import Packet

packet = (Packet(sys.argv[0],sys.argv[1],sys.argv[2]))

print(packet)
