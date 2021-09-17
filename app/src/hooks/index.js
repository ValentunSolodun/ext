import {useEffect, useState} from 'react';
import _ from 'lodash';

export const useNetworkLogs = () => {

  const [logs, setLogs] = useState([]);
  const onRequestFinished = _.get(window, 'chrome.devtools.network.onRequestFinished');

  const handleOnCallBack = async (request) => {
    // console.log('request received:', request);
    const data = {
      ...request,
    };

    data.responseBody = await new Promise(resolve => {
      request.getContent((c, e) => {
        try {
          const parsedContent = JSON.parse(c);
          resolve(parsedContent);
        } catch (e) {
          resolve(c);
        }
      });
    });
    setLogs(prevState => ([...prevState, data]));
  };

  useEffect(() => {
    if (!onRequestFinished) return;
    onRequestFinished.addListener(handleOnCallBack);
    return () => onRequestFinished.removeListener();
  }, []);

  return _.filter(logs, (l) => l._resourceType === 'xhr');
};