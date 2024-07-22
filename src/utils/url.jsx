const { VITE_NODE_ENV, VITE_DEV_BASE_URL, VITE_PROD_BASE_URL } = import.meta.env

const backUrl =
VITE_NODE_ENV === 'production'
    ? VITE_PROD_BASE_URL
    : VITE_DEV_BASE_URL

export default backUrl
