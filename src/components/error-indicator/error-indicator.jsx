import React from 'react';
import { Alert } from 'antd';

import './error-indicator.css';

const ErrorIndicator = () => <Alert message="Something has gone wrong!" type="error" className="error_indicator" />;
export default ErrorIndicator;
