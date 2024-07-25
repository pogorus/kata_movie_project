import React from 'react';
import { Alert } from 'antd';

import './offline-indicator.css';

const OfflineIndicator = () => (
  <Alert message="Looks like you're offline!" type="error" className="offline_indicator" />
);
export default OfflineIndicator;
