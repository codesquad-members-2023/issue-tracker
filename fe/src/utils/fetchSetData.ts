import { SetStateAction } from 'react';

const fetchSetData = async (api: string, setState: SetStateAction<any>) => {
  try {
    const res = await fetch(api);
    if (!res.ok) {
      throw new Error(`에러가 발생했습니다. 에러내용: ${res}`);
    } else {
      const data = await res.json();
      setState(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchSetData;
