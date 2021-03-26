import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();

export const API = publicRuntimeConfig.PRODUCTION ? '' : 'http://localhost:8000'; 