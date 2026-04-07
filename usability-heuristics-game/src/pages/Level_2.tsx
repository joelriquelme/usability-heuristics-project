import React, { useState } from 'react';
import '../styles/Level_2.css';
import { FaDownload } from 'react-icons/fa';

type DownloadNotification = {
  id: number;
  message: string;
};

const Level2: React.FC = () => {
  const files = [
    { name: '7b069ff1c53bee585f417433f697c2b8.pdf', size: '336.3 KB', sizeInKB: 336.3 },
    { name: 'Bases Cachipun 2026.pdf', size: '255.1 KB', sizeInKB: 255.1 },
    { name: 'Bases Cara de Caca 2026.pdf', size: '139.3 KB', sizeInKB: 139.3 },
    { name: 'Bases Tenis de Mesa 2026.pdf', size: '249.1 KB', sizeInKB: 249.1 },
    { name: 'fdd73255f4af.pdf', size: '336.4 KB', sizeInKB: 336.4 },
    { name: 'llave1.txt', size: '10.3 KB', sizeInKB: 10.3 },
    { name: 'memoryDumpCTF2.txt', size: '2.7 KB', sizeInKB: 2.7 },
  ];

  const [notifications, setNotifications] = useState<DownloadNotification[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Record<string, boolean>>({});

  const handleDownload = (fileName: string, fileSize: number) => {
    const downloadTime = Math.min(Math.max(fileSize / 100, 1), 5) * 1000; // Simulate download time (1-5 seconds)
    const newId = Date.now() + Math.random();

    setTimeout(() => {
      const newNotification = { id: newId, message: `¡Descarga completada! Archivo: ${fileName}` };

      setNotifications((prev) => [...prev, newNotification]);

      // Remove notification after 3 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== newId));
      }, 3000);
    }, downloadTime);
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

  return (
    <div className="level-2">
      <header className="header">
        <h1 className="header-title">DCCfiles - Sistema de Gestión de Descargas</h1>
        <button className="header-download-button" onClick={handleBulkDownload}>
          Descargar seleccionados <FaDownload />
        </button>
      </header>
      <div className="level-2__notifications-stack">
        {notifications.map((n) => (
          <div key={n.id} className="level-2__notification">
            <span className="level-2__notification-icon">✓</span>
            {n.message}
          </div>
        ))}
      </div>
      <div className="content">
        <div className="file-list">
          <ul>
            {files.map((file, index) => (
              <li key={index} className="file-item">
                <div data-eval={index === 0 ? "show" : undefined} question-id={index === 0 ? "level-2-file-checkbox" : undefined}>
                <input
                  type="checkbox"
                  className="file-checkbox"
                  checked={!!selectedFiles[file.name]}
                  onChange={() => toggleFileSelection(file.name)}
                />
                </div>
                <span className="file-name">{file.name}</span>
                <span className="file-size">{file.size}</span>
                <div className="file-actions">
                  <button
                    className="action-button download"
                    onClick={() => handleDownload(file.name, file.sizeInKB)}
                  >
                    <FaDownload />
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

export default Level2;