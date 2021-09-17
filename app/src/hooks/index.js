import {useEffect, useState} from 'react';
import _ from 'lodash';
import {DEV_DELAY, isDev, MAX_LOGS_TO_SAVE, TEST_RESPONSE} from "../const";

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
    setNewRequest(data);
  };

  const setNewRequest = request => {
    setLogs(prevState => {
      const newState = [...prevState, request];
      // const length = _.get(newState, 'length');
      // if(length > MAX_LOGS_TO_SAVE) {
      //   return newState.slice(-MAX_LOGS_TO_SAVE);
      // }

      return newState;
    });
  };

  const handleSpamLogs = () => {
    setNewRequest({...TEST_RESPONSE, connection: new Date().getTime() + Math.random().toFixed(25)});
  };

  useEffect(() => {
    if (isDev) {
      setInterval(() => {
        handleSpamLogs();
      }, DEV_DELAY);
    }
  }, []);

  useEffect(() => {
    if (!onRequestFinished) return;
    onRequestFinished.addListener(handleOnCallBack);
    return () => onRequestFinished.removeListener();
  }, [onRequestFinished]);

  return {logs: _.filter(logs, (l) => l._resourceType === 'xhr'), clear: () => setLogs([])};
};