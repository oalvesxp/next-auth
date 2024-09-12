export async function HttpClient(url, options) {
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : null,
  }).then(async (res) => {
    return {
      ok: res.ok,
      status: res.status,
      body: await res.json(),
    }
  })
}
