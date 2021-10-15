import React, {createContext, useContext, useEffect, useState} from "react";
import _ from "lodash";
import {DEV_DELAY, isDev, TEST_RESPONSE} from "../const";

const NetworkLogsContext = createContext();

export const useNetworkLogs = () => useContext(NetworkLogsContext);

const NetworkLogsProvider = (props) => {
  const [logs, setLogs] = useState([]);
  const [resourceTypes, setResourceTypes] = useState(['xhr']);
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

  const handleOnClear = () => {
    console.log('clear');
    setLogs([]);
  };

  const addFilterByType = (type) => {
    setResourceTypes(prevState => ([...prevState, type]));
  };

  const removeFilterByType = (type) => {
    setResourceTypes(prevState => _.filter(prevState, s => s !== type));
  };

  const getFilteredLogs = (logs) => {
    let filteredLogs = [...logs];
    if (!_.isEmpty(resourceTypes)) {
      filteredLogs = _.filter(filteredLogs, l => _.some(resourceTypes, t => t === l._resourceType));
    }
    return filteredLogs;
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

  return (
    <NetworkLogsContext.Provider
      value={{
        resourceTypes,
        addFilterByType,
        removeFilterByType,
        logs: getFilteredLogs(logs),
        clear: handleOnClear
      }}
    >
      {props.children}
    </NetworkLogsContext.Provider>
  )
};

export default NetworkLogsProvider;