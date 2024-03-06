// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BITSTAMP:BTCUSD",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "3",
          "locale": "en",
          "enable_publishing": false,
          "hide_top_toolbar": true,
          "save_image": false,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
    // @ts-ignore
    container.current.appendChild(script);

    return () => {
      // @ts-ignore
      container.current.removeChild(script);
    };
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      // @ts-ignore
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
    </div>
  );
}

export default memo(TradingViewWidget);
