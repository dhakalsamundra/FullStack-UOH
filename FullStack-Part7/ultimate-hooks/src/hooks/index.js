import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (url) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const initialValue = async () => {
      const res = await axios.get(url);
      setResources(res.data);
    };
    initialValue();
  }, [url]);

  const create = async (resource) => {
    const res = await axios.post(url, resource);
    setResources([...resources, res.data]);
  };

  const service = {
    create,
  };

  return [resources, service];
};
