import { useQuery } from "@tanstack/react-query";

export interface Candle {
  timestamp: number;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface AllCandles {
  min1: Candle[];
  hour1: Candle[];
  day1: Candle[];
}


 // retrieve 1-minute, 1-hour and 1-day candles for a FundingManager in one request.
 
export function useCandles(fundingManagerAddress: `0x${string}` | undefined) {
  const GRAPH_ENDPOINT =
    "https://api.studio.thegraph.com/query/1685479/mosaic-subgraph/v0.0.12";

  return useQuery<AllCandles>({
    queryKey: ["candles", fundingManagerAddress],
    enabled: !!fundingManagerAddress,
    queryFn: async () => {
      const query = `
        query GetAllPeriods($fundingManager: Bytes!) {
          min1: candles(
            where: { fundingManagerAddress: $fundingManager, period: MIN_1 }
            orderBy: periodStartTimestamp
            orderDirection: desc
            first: 60
          ) {
            periodStartTimestamp
            open
            high
            low
            close
            volume
          }
          hour1: candles(
            where: { fundingManagerAddress: $fundingManager, period: HOUR_1 }
            orderBy: periodStartTimestamp
            orderDirection: desc
            first: 24
          ) {
            periodStartTimestamp
            open
            high
            low
            close
            volume
          }
          day1: candles(
            where: { fundingManagerAddress: $fundingManager, period: DAY_1 }
            orderBy: periodStartTimestamp
            orderDirection: desc
            first: 30
          ) {
            periodStartTimestamp
            open
            high
            low
            close
            volume
          }
        }
      `;

      const res = await fetch(GRAPH_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          variables: { fundingManager: fundingManagerAddress },
        }),
      });

      if (!res.ok) {
        throw new Error(`GraphQL request failed: ${res.statusText}`);
      }

      type RawCandle = {
        periodStartTimestamp: string;
        open: string;
        high: string;
        low: string;
        close: string;
        volume: string;
      };

      interface GraphResponse {
        data: {
          min1: RawCandle[];
          hour1: RawCandle[];
          day1: RawCandle[];
        };
      }

      const json: GraphResponse = await res.json();

      const map = (rows: RawCandle[], formatter: Intl.DateTimeFormat) =>
        rows
          .map((c) => {
            const timestampMs = parseInt(c.periodStartTimestamp, 10) * 1000;
            return {
              timestamp: timestampMs,
              time: formatter.format(new Date(timestampMs)),
              open: parseFloat(c.open),
              high: parseFloat(c.high),
              low: parseFloat(c.low),
              close: parseFloat(c.close),
              volume: parseFloat(c.volume),
            } as Candle;
          })
          .sort((a, b) => a.timestamp - b.timestamp);

      const fmtMinute = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const fmtHour = fmtMinute;
      const fmtDay = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
      });

      return {
        min1: map(json.data.min1, fmtMinute),
        hour1: map(json.data.hour1, fmtHour),
        day1: map(json.data.day1, fmtDay),
      };
    },
  });
}
