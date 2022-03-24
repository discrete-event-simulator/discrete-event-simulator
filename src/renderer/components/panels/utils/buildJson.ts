import { servers } from 'renderer/components/settings/componentSettings';

const buildJson = (elements) => {
  console.log(elements);
  const json = {
    components: [],
    connections: [],
    display_data: [],
  };

  elements
    .filter(
      (element) =>
        !element?.source &&
        element?.data.type !== 'ServerMonitor' &&
        element?.data.type !== 'Start'
    )
    .forEach((element) => {
      if (element.data.type === 'TCPPacketGenerator') {
        const tcpPacketGeneratorId = element.data.label.split(' ')[1];
        const flowComponentName = `Flow_${tcpPacketGeneratorId}`;
        const tcpCubicComponentName = `TCP_Cubic_${tcpPacketGeneratorId}`;

        const flowObj = {
          name: flowComponentName,
          type: 'Flow',
          attributes: {
            ...Object.keys(element.data.configs)
              .filter((key) => key.startsWith('flow_'))
              .reduce(
                (acc, cur) => ({
                  ...acc,
                  [cur.replace('flow_', '')]: element.data.configs[cur],
                }),
                {}
              ),
            src: `flow_${tcpPacketGeneratorId}`,
            dst: `flow_${tcpPacketGeneratorId}`,
          },
        };
        const ccObj = {
          name: tcpCubicComponentName,
          type: 'TCPCubic',
          attributes: {},
        };
        const tcpPacketGeneratorObj = {
          name: element.data.label.split(' ').join('_'),
          type: element.data.type,
          attributes: {
            ...Object.keys(element.data.configs)
              .filter((key) => !key.startsWith('flow_'))
              .reduce(
                (acc, cur) => ({ ...acc, [cur]: element.data.configs[cur] }),
                {}
              ),
            flow: { reference: flowComponentName },
            cc: { reference: tcpCubicComponentName },
          },
        };
        json.components.push(ccObj);
        json.components.push(flowObj);
        json.components.push(tcpPacketGeneratorObj);
      } else {
        const eObj = {
          name: element.data.label.split(' ').join('_'),
          type: element.data.type,
          attributes: {
            ...element.data.configs,
          },
        };

        json.components.push(eObj);
      }
    });

  // ServerMonitor initialized last
  elements
    .filter(
      (element) => !element?.source && element?.data.type === 'ServerMonitor'
    )
    .forEach((element) => {
      const eObj = {
        name: element.data.label.split(' ').join('_'),
        type: element.data.type,
        attributes: {
          ...element.data.configs,
        },
      };

      if (Object.keys(eObj['attributes']).includes('server')) {
        eObj['attributes']['server'] = {
          reference: eObj['attributes']['server'],
        };
      }

      json.components.push(eObj);
    });
  elements
    .filter((element) => element?.source)
    .forEach((element) => {
      const pObj = {
        from: {
          name: elements
            .find((ele) => ele.id === element.source)
            .data.label.split(' ')
            .join('_'),
        },
        to: {
          name: elements
            .find((ele) => ele.id === element.target)
            .data.label.split(' ')
            .join('_'),
        },
      };
      if (element?.sourceHandle) {
        pObj.from['port'] = element.sourceHandle === 'a' ? 'out1' : 'out2';
      }
      if (element?.targetHandle) {
        pObj.to['port'] = element.targetHandle === 'a' ? 'out1' : 'out2';
      }
      json.connections.push(pObj);
    });

  elements
    .filter((element) => !element?.source && element.data.type.includes('Sink'))
    .forEach((element) => {
      const pObj = {
        name: element.data.label.split(' ').join('_'),
        informations: ['waits', 'arrivals'],
      };
      json.display_data.push(pObj);
    });
  console.log('Json', json);
  return json;
};

export default buildJson;
