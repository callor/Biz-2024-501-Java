import config from '@config';
import Axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { DEFAULT_PROFILE_IMG } from './contants';

export const axios = Axios.create({
  baseURL: config.baseURL,
  headers: { Pragma: 'no-cache' },
});

export const serverAxios = ({ req, res }: GetServerSidePropsContext) => {
  const axios = Axios.create({
    baseURL: config.baseURL,
    headers: { authorization: `Bearer ${parseCookies({ req }).nsid}` },
  });

  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.status === 401) {
        destroyCookie({ res }, 'nsid');
        res.writeHead(302, { Location: '/signIn' });
        res.end();
      }
      return Promise.reject(err);
    },
  );

  return axios;
};

export const axiosFetcher = (url: string) => axios.get(url).then((res) => res.data);

export const cookieOption = {
  maxAge: 3 * 24 * 3600, // 쿠키 3일
  path: '/',
  httpOnly: true,
  secure: false,
};

export const getThumbnail = (fileId: string) =>
  fileId ? `${config.baseURL}/file/thumbnail/${fileId}` : DEFAULT_PROFILE_IMG;
