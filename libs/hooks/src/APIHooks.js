import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import {
  useInfoViewActionsContext,
  useInfoViewContext,
} from "@crema/context/InfoViewContextProvider";
import { isRequestSuccessful, sanitizeData } from "@crema/helpers";
import Axios from "@crema/services/axios";
import { useDebounce } from "./useDebounce";
import jwtAxios from "@crema/services/auth/JWT";

export const useGetDataApi = (
  url,
  initialData = undefined,
  params = {},
  initialCall = true,
  callbackFun
) => {
  const { fetchError } = useInfoViewActionsContext();
  const [initialUrl, setInitialUrl] = useState(url);
  const [allowApiCall, setAllowApiCall] = useState(initialCall);
  const [loading, setLoading] = useState(initialCall);
  const [apiData, setData] = useState(initialData);
  const [queryParams, updateQueryParams] = useState(params);
  const resStateRef = useRef(false);
  const didCancelRef = useRef(false);

  const updateInitialUrl = (value) => {
    setAllowApiCall(true);
    setInitialUrl(value);
  };

  const reCallAPI = () => {
    setQueryParams(queryParams);
  };

  const setQueryParams = (queryParams) => {
    setLoading(true);
    updateQueryParams({ ...queryParams });
    setAllowApiCall(true);
  };

  useEffect(() => {
    didCancelRef.current = false;
    const fetchData = () => {
      resStateRef.current = true;
      let params = {};
      if (!_.isEmpty(queryParams)) {
        params = {
          ...trimObjectValues(queryParams),
        };
      }
      Axios.get(initialUrl, { params: sanitizeData(params) })
        .then((data) => {
          resStateRef.current = false;
          if (!didCancelRef.current) {
            if (isRequestSuccessful(data.status)) {
              setLoading(false);
              setData(data.data);
              if (callbackFun) callbackFun(data.data);
            } else {
              setLoading(false);
              fetchError(data.data.error ? data.data.error : data.data.message);
              setData(initialData);
              if (callbackFun) callbackFun(data.data);
            }
          }
        })
        .catch((error) => {
          if (error.response.data.message) {
            if (callbackFun) callbackFun(error.response.data);
            fetchError(error.response.data.message);
          } else {
            fetchError(error.message);
            if (callbackFun) callbackFun(error);
          }
          setLoading(false);
        });
    };
    if (allowApiCall && !resStateRef.current) fetchData();
    return () => {
      didCancelRef.current = true;
    };
  }, [initialUrl, queryParams, allowApiCall]);
  return [
    {
      loading,
      apiData,
      initialUrl,
    },
    {
      setData,
      setLoading,
      updateInitialUrl,
      setQueryParams,
      reCallAPI,
    },
  ];
};

export const useGetData = (
  url,
  initialFilter = "",
  sortBy = "UpdatedDate",
  asc = -1,
  size = 10,
  allowApiCall = true
) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const { loading } = useInfoViewContext();

  const [apiData, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearchQuery] = useState(initialFilter);

  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const [sort, setSort] = useState({ [sortBy]: asc });

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (allowApiCall) {
      getData();
    }
  }, [debouncedSearch, sort, page]);

  useEffect(() => {
    if (orderBy) {
      setSort({
        [orderBy]: order === "desc" ? -1 : 1,
      });
    }
  }, [orderBy, order]);

  const getData = async (filter = undefined) => {
    try {
      const data = await postData(url, infoViewActionsContext, {
        ValueFilter: filter || debouncedSearch,
        Sort: sort,
        PageIndex: page,
        PageSize: size,
      });
      setTotalCount(data.totalCount);
      setData(data.datas);
    } catch (error) {
      infoViewActionsContext.fetchError(error.message);
    }
  };

  const onSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(1);
  };

  return [
    { loading, apiData, order, orderBy, totalCount, page },
    { onSearch, handleRequestSort, setPage, getData, setData },
  ];
};

export const postData = (
  url,
  infoViewContext,
  payload,
  isHideLoader = false,
  headers = {}
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .post(url, sanitizeData(payload), headers)
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const putData = (
  url,
  infoViewContext,
  payload,
  isHideLoader = false
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .put(url, sanitizeData(payload))
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const getData = (
  url,
  infoViewContext,
  params = {},
  isHideLoader = false,
  headers
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .get(url, { params: sanitizeData(params), headers })
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const deleteData = (
  url,
  infoViewContext,
  params = {},
  isHideLoader = false
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .delete(url, { params })
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const trimObjectValues = (obj) => {
  if (_.isEmpty(obj)) {
    return obj;
  }
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "string") {
      obj[key] = obj[key].trim();
    }
  });
  return obj;
};

const handleApiResponse = (url, fetchSuccess, data, resolve, reject) => {
  fetchSuccess();
  if (isRequestSuccessful(data.status)) {
    return resolve(data.data);
  } else {
    return reject(data.data);
  }
};

const handleAPIError = (url, fetchSuccess, error, reject) => {
  fetchSuccess();
  if (error.response.data.message) {
    return reject(error.response.data);
  } else {
    return reject(error);
  }
};

export const postDataApi = (
  url,
  infoViewContext,
  payload,
  isHideLoader = false,
  headers
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    Axios.post(url, sanitizeData(payload), headers ? { headers } : {})
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const putDataApi = (
  url,
  infoViewContext,
  payload,
  isHideLoader = false
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    Axios.put(url, sanitizeData(payload))
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const getDataApi = (
  url,
  infoViewContext,
  params = {},
  isHideLoader = false,
  headers
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    Axios.get(url, { params: sanitizeData(params), headers })
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const deleteDataApi = (
  url,
  infoViewContext,
  params = {},
  isHideLoader = false
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    Axios.delete(url, { params })
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const uploadDataApi = (
  url,
  infoViewContext,
  payload = {},
  isHideLoader = false,
  onUploadProgress = () => {},
  allowDownload = false
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    Axios.post(url, payload, {
      onUploadProgress,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      responseType: allowDownload ? "arraybuffer" : "stream",
    })
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const uploadPutDataApi = (
  url,
  infoViewContext,
  payload = {},
  isHideLoader = false
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    Axios.put(url, payload, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};
