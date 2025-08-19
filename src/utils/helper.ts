type ParamUpdate = { key: string; value?: string | null };

export const getQueryParam = (query: string): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get(query);
};
export const updateQueryParam = (key: string, value: string) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  params.set(key, value);

  window.history.pushState({}, '', `${url.pathname}?${params.toString()}`);
};
export const updateListQueryParam = (paramsToUpdate: { key: string; value: string }[]) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  for (const { key, value } of paramsToUpdate) {
    params.set(key, value);
  }

  window.history.pushState({}, '', `${url.pathname}?${params.toString()}`);
};
export const removeQueryParam = (key: string) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  params.delete(key);

  const newSearch = params.toString();
  const newUrl = newSearch ? `${url.pathname}?${newSearch}` : url.pathname;

  window.history.pushState({}, '', newUrl);
};

export const updateQueryParams = (updates: ParamUpdate[]) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  updates.forEach(({ key, value }) => {
    if (value === undefined || value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  });

  const newSearch = params.toString();
  const newUrl = newSearch ? `${url.pathname}?${newSearch}` : url.pathname;

  window.history.pushState({}, '', newUrl);
};
