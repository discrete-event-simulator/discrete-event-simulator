const buildJson = (elements) => {
  console.log(elements);
  const json = {
    components: [],
    connections: [],
    display_data: [],
  };

  elements
    .filter((element) => !element?.source && element?.data.type !== 'Start')
    .forEach((element) => {
      const eObj = {
        name: element.data.label.split(' ').join('_'),
        type: element.data.type,
        attributes: {
          ...element.data.configs,
        },
      };

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
