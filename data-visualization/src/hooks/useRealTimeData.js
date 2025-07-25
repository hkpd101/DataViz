import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

export const useRealTimeData = (clientId) => {
  const [data, setData] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Connecting');
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const socketUrl = process.env.NEXT_PUBLIC_WS_URL 
    ? `${process.env.NEXT_PUBLIC_WS_URL}/${clientId}`
    : `ws://localhost:8000/ws/${clientId}`;

  useEffect(() => {
    let mounted = true;
    
    console.log('🚀 WebSocket connecting to:', socketUrl);
    
    const connect = () => {
      if (!mounted) return;
      
      try {
        wsRef.current = new WebSocket(socketUrl);
        
        wsRef.current.onopen = () => {
          if (!mounted) return;
          console.log('✅ WebSocket connected');
          setConnectionStatus('Connected');
          setIsConnected(true);
          toast.success('Connected to real-time data stream');
        };
        
        wsRef.current.onmessage = (event) => {
          if (!mounted) return;
          try {
            const parsedData = JSON.parse(event.data);
            console.log('📨 Real-time data received:', {
              timestamp: parsedData.timestamp,
              hasSteel: !!parsedData.steel_production,
              hasEfficiency: !!parsedData.production_efficiency,
              hasQuality: !!parsedData.quality_metrics
            });
            setData(parsedData);
          } catch (error) {
            console.error('❌ Data parse error:', error);
          }
        };
        
        wsRef.current.onclose = (event) => {
          console.log('❌ WebSocket closed:', event.code);
          if (mounted) {
            setConnectionStatus('Closed');
            setIsConnected(false);
            
            // Auto-reconnect on unexpected close
            if (event.code !== 1000) {
              reconnectTimeoutRef.current = setTimeout(() => {
                if (mounted) {
                  console.log('🔄 Reconnecting...');
                  connect();
                }
              }, 3000);
            }
          }
        };
        
        wsRef.current.onerror = (error) => {
          console.error('❌ WebSocket error:', error);
          if (mounted) {
            setConnectionStatus('Error');
            setIsConnected(false);
          }
        };
        
      } catch (error) {
        console.error('❌ Failed to create WebSocket:', error);
        setConnectionStatus('Error');
        setIsConnected(false);
      }
    };
    
    connect();
    
    return () => {
      mounted = false;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [clientId, socketUrl]);

  return {
    data,
    connectionStatus,
    isConnected
  };
};
