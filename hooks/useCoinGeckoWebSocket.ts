import { useEffect, useRef, useState } from 'react';

const WS_Base = `${process.env.NEXT_PUBLIC_COINGECKO_WS_URL}/ws/v3/coins/`;

export const useCoinGeckoWebSocket = ([
  coinId,
  poolId,
  liveInterval,
]: UseCoinGeckoWebSocketProps): UseCoinGeckoWebSocketReturn => {
  const wsRef = useRef<WebSocket | null>(null);
  const subscribed = useRef(<Set<string>>new Set());

  const [price, setPrice] = useState<ExtendedPriceData | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [ohlcv, setOhlcv] = useState<OHLCData | null>(null);

  const [isWsReady, setIsWsReady] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(WS_Base);
    wsRef.current = ws;

    const send = (payload: Record<string, unknown>) => ws.send(JSON.stringify(payload));

    const handleMessage = (event: MessageEvent) => {
      const msg: WebSocketMessage = JSON.parse(event.data);

      if (!msg.type === 'ping') {
        send();
      }
    };
  }, []);
};
