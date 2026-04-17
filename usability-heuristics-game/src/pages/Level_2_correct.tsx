import React, { useEffect, useRef, useState } from 'react';
import '../styles/Level_2.css';
import { FaDownload } from 'react-icons/fa';

type DownloadNotification = {
  id: number;
  message: string;
  type?: 'success' | 'error';
};

type DownloadState = {
  progress: number;
  status: 'idle' | 'downloading' | 'done' | 'error';
  timerId?: number | null;
};

const Level2Correct: React.FC = () => {
  const files = [
    { name: 'bolsa.c', size: '972 B', sizeInKB: 0.972 },
    { name: 'Programa del curso CC4401 Semestre Primavera 2026.pdf', size: '2.3 MB', sizeInKB: 2300 },
    { name: 'Tarea 1 PSS.pdf', size: '1.07 MB', sizeInKB: 1100 },
    { name: 'important-photo.jpg', size: '139.3 KB', sizeInKB: 139.3 },
    { name: 'Auxiliar 01.pdf', size: '1.01 MB', sizeInKB: 1.01 * 1024 },
    { name: 'datos.bin', size: '55.3 GB', sizeInKB: 55.3 * 1024 * 1024 },
    { name: 'memoryDumpCTF2.txt', size: '2.7 KB', sizeInKB: 2.7 },
  ];

  const [notifications, setNotifications] = useState<DownloadNotification[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Record<string, boolean>>({});
  const [downloadStates, setDownloadStates] = useState<Record<string, DownloadState>>({});

  const timersRef = useRef<number[]>([]);

  const handleDownload = (fileName: string, fileSize: number) => {
    // Handle explicit corrupt file error for bolsa.c
    if (fileName === 'bolsa.c') {
      const errId = Date.now() + Math.random();
      setDownloadStates((prev) => ({ ...prev, [fileName]: { progress: 0, status: 'error', timerId: null } }));
      setNotifications((prev) => [...prev, { id: errId, message: 'Error: Archivo corrupto, imposible de descargar', type: 'error' }]);
      setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== errId)), 3000);
      return;
    }

    // Prevent starting another download if already downloading
    if (downloadStates[fileName]?.status === 'downloading') return;

      // Simulate download time using a logarithmic scale so size differences are visible
      // fileSize is in KB; add 1 to avoid log10(0)
      const duration = Math.min(Math.max(Math.log10(fileSize + 1) * 4500, 1500), 60000); // ms
    const stepInterval = 100; // ms
    const increments = Math.max(1, Math.round(duration / stepInterval));
    const incrementValue = 100 / increments;

    let current = 0;
    const timerId = window.setInterval(() => {
      current += incrementValue;
      const newProgress = Math.min(100, Math.round(current));
      setDownloadStates((prev) => ({ ...prev, [fileName]: { progress: newProgress, status: 'downloading', timerId } }));
      if (newProgress >= 100) {
        window.clearInterval(timerId);
        // remove timer from ref
        timersRef.current = timersRef.current.filter((t) => t !== timerId);
        setDownloadStates((prev) => ({ ...prev, [fileName]: { progress: 100, status: 'done', timerId: null } }));
        const newId = Date.now() + Math.random();
        setNotifications((prev) => [...prev, { id: newId, message: `¡Descarga completada! Archivo: ${fileName}`, type: 'success' }]);
        setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== newId)), 3000);
      }
    }, stepInterval);

    // track timer and initialize state
    timersRef.current.push(timerId);
    setDownloadStates((prev) => ({ ...prev, [fileName]: { progress: 0, status: 'downloading', timerId } }));
  };

  const handleBulkDownload = () => {
    Object.keys(selectedFiles).forEach((fileName) => {
      if (selectedFiles[fileName]) {
        const file = files.find((f) => f.name === fileName);
        if (file) {
          handleDownload(file.name, file.sizeInKB);
        }
      }
    });
  };

  const toggleFileSelection = (fileName: string) => {
    setSelectedFiles((prev) => ({ ...prev, [fileName]: !prev[fileName] }));
  };

  useEffect(() => {
    return () => {
      // clear any active timers on unmount
      timersRef.current.forEach((t) => window.clearInterval(t));
      timersRef.current = [];
    };
  }, []);

  const formatDownloadedLabel = (file: { name: string; size: string; sizeInKB: number }) => {
    const state = downloadStates[file.name];
    const progress = state?.progress ?? 0;

    const totalKB = file.sizeInKB;
    // Determine display unit from file.size string
    const sizeStr = file.size;
    if (sizeStr.includes('GB')) {
      const totalGB = totalKB / (1024 * 1024);
      const downloadedGB = (totalGB * progress) / 100;
      return `${downloadedGB.toFixed(2)} GB / ${sizeStr}`;
    }
    if (sizeStr.includes('MB')) {
      const totalMB = totalKB / 1024;
      const downloadedMB = (totalMB * progress) / 100;
      return `${downloadedMB.toFixed(2)} MB / ${sizeStr}`;
    }
    if (sizeStr.includes('KB')) {
      const downloadedKB = (totalKB * progress) / 100;
      return `${downloadedKB.toFixed(1)} KB / ${sizeStr}`;
    }
    // Bytes
    const totalBytes = Math.round(totalKB * 1024);
    const downloadedBytes = Math.round((totalBytes * progress) / 100);
    return `${downloadedBytes} B / ${sizeStr}`;
  };

  return (
    <div className="level-2">
      <header className="header">
        <h1 className="header-title">DCCfiles - Sistema de Gestión de Descargas</h1>
        <div>
        <button 
          className="header-download-button" 
          onClick={handleBulkDownload}>
          Descargar seleccionados <FaDownload />
        </button>
        </div>
      </header>
      <div className="level-2__notifications-stack">
        {notifications.map((n) => (
          <div key={n.id} className={`level-2__notification ${n.type === 'error' ? 'error' : 'success'}`}>
            <span className={`level-2__notification-icon ${n.type === 'error' ? 'level-2__notification-icon-error' : ''}`}>
              {n.type === 'error' ? 'X' : '✓'}
            </span>
            {n.message}
          </div>
        ))}
      </div>
      <div className="content">
        <div className="file-list">
          <ul>
            {files.map((file, index) => (
              <li key={index} className="file-item">
                <div>
                <input
                  type="checkbox"
                  className="file-checkbox"
                  checked={!!selectedFiles[file.name]}
                  onChange={() => toggleFileSelection(file.name)}
                />
                </div>
                <span className="file-name">{file.name}</span>
                <span className="file-size">{formatDownloadedLabel(file)}</span>
                <div className="file-actions">
                  <button
                    className={`action-button download ${downloadStates[file.name]?.status === 'error' ? 'error' : ''}`}
                    onClick={() => handleDownload(file.name, file.sizeInKB)}
                    disabled={downloadStates[file.name]?.status === 'downloading' || downloadStates[file.name]?.status === 'error'}
                    aria-label={`Download ${file.name}`}
                  >
                    {downloadStates[file.name]?.status === 'downloading' ? (
                      <svg className="circular-progress" viewBox="0 0 36 36" width="20" height="20" aria-hidden>
                        <path className="bg" d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="4" />
                        <path
                          className="progress"
                          strokeDasharray="100"
                          strokeDashoffset={String(100 - (downloadStates[file.name]?.progress || 0))}
                          d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="4" />
                      </svg>
                    ) : downloadStates[file.name]?.status === 'error' ? (
                      <span className="error-indicator">!</span>
                    ) : (
                      <FaDownload />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Level2Correct;