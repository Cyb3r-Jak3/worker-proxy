interface ProxyPath {
  source: string;
  destination: string;
}

const proxies: ProxyPath[] = [
  {
    source: "har-analysis.cyberjake.xyz",
    destination: "har-analysis.herokuapp.com",
  },
];

export default {
  async fetch(request: Request): Promise<Response> {
    const origin = new URL(request.url);

    for (const proxy of proxies) {
      console.log(origin.hostname);
      if (origin.hostname == proxy.source) {
        const resp = await fetch(
          `https://${proxy.destination}${origin.pathname}`,
          {
            headers: request.headers,
          }
        );
        return resp;
      }
    }

    return new Response("Proxy Not Found", { status: 404 });
  },
};
