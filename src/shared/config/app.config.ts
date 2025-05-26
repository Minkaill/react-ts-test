/**
 * Утилита для безопасного получения переменных окружения
 */
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  if (typeof window !== 'undefined') {
    // В браузере переменные окружения недоступны напрямую
    return defaultValue;
  }
  
  try {
    return (globalThis as any).process?.env?.[key] || defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Получение переменной окружения с преобразованием в число
 */
const getEnvNumber = (key: string, defaultValue: number): number => {
  const value = getEnvVar(key);
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Получение переменной окружения с преобразованием в boolean
 */
const getEnvBoolean = (key: string, defaultValue: boolean): boolean => {
  const value = getEnvVar(key).toLowerCase();
  if (value === 'true' || value === '1') return true;
  if (value === 'false' || value === '0') return false;
  return defaultValue;
};

// Определение режимов окружения
const environment = getEnvVar('NODE_ENV', 'development');
const isDevelopment = environment === 'development';
const isProduction = environment === 'production';
const isTest = environment === 'test';

/**
 * Основная конфигурация приложения
 * Все настройки централизованы и типизированы
 */
export const APP_CONFIG = {
  // API конфигурация
  api: {
    baseUrl: getEnvVar('REACT_APP_API_URL', isDevelopment ? 'http://localhost:8000/api' : ''),
    timeout: getEnvNumber('REACT_APP_API_TIMEOUT', 10000),
    retryAttempts: 3,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },

  // Настройки приложения
  app: {
    name: getEnvVar('REACT_APP_NAME', 'React TS Boilerplate'),
    version: getEnvVar('REACT_APP_VERSION', '1.0.0'),
    environment,
    isDevelopment,
    isProduction,
    isTest,
    port: getEnvNumber('PORT', 3000),
  },

  // UI конфигурация
  ui: {
    breakpoints: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
    animations: {
      duration: {
        fast: 150,
        normal: 300,
        slow: 500,
      },
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    grid: {
      containerMaxWidth: 1400,
      gutterWidth: 20,
    },
    theme: {
      primaryColor: '#007bff',
      secondaryColor: '#6c757d',
      successColor: '#28a745',
      dangerColor: '#dc3545',
      warningColor: '#ffc107',
      infoColor: '#17a2b8',
    },
  },

  // Функциональные возможности
  features: {
    enableAnalytics: getEnvBoolean('REACT_APP_ENABLE_ANALYTICS', false),
    enableErrorReporting: getEnvBoolean('REACT_APP_ENABLE_ERROR_REPORTING', true),
    enableDevTools: getEnvBoolean('REACT_APP_ENABLE_DEV_TOOLS', isDevelopment),
    enableServiceWorker: isProduction,
    enableHotReload: isDevelopment,
  },

  // Бизнес-логика
  business: {
    currency: {
      default: getEnvVar('REACT_APP_DEFAULT_CURRENCY', 'USD'),
      symbol: getEnvVar('REACT_APP_CURRENCY_SYMBOL', '$'),
      precision: 2,
    },
    pagination: {
      defaultPageSize: getEnvNumber('REACT_APP_DEFAULT_PAGE_SIZE', 12),
      maxPageSize: getEnvNumber('REACT_APP_MAX_PAGE_SIZE', 100),
      pageSizeOptions: [12, 24, 48, 96],
    },
    cart: {
      maxItems: getEnvNumber('REACT_APP_MAX_CART_ITEMS', 99),
      sessionTimeout: 30 * 60 * 1000, // 30 минут
      autoSaveInterval: 5 * 60 * 1000, // 5 минут
    },
    validation: {
      minPasswordLength: 8,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    },
  },

  // Настройки сборки и разработки
  build: {
    generateSourceMap: getEnvBoolean('GENERATE_SOURCEMAP', isDevelopment),
    bundleAnalyzer: getEnvBoolean('ANALYZE_BUNDLE', false),
    publicPath: getEnvVar('PUBLIC_PATH', '/'),
  },
} as const;

// Экспорт типов для использования в приложении
export type AppConfig = typeof APP_CONFIG;
export type Environment = typeof APP_CONFIG.app.environment;
export type ApiConfig = typeof APP_CONFIG.api;
export type UIConfig = typeof APP_CONFIG.ui;
export type FeaturesConfig = typeof APP_CONFIG.features;
export type BusinessConfig = typeof APP_CONFIG.business;

// Утилиты для работы с конфигурацией
export const config = {
  /**
   * Проверка, включена ли функция
   */
  isFeatureEnabled: (feature: keyof typeof APP_CONFIG.features): boolean => {
    return APP_CONFIG.features[feature];
  },

  /**
   * Получение URL API с путем
   */
  getApiUrl: (path: string = ''): string => {
    const baseUrl = APP_CONFIG.api.baseUrl;
    if (!baseUrl) return path;
    return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  },

  /**
   * Получение breakpoint значения
   */
  getBreakpoint: (size: keyof typeof APP_CONFIG.ui.breakpoints): number => {
    return APP_CONFIG.ui.breakpoints[size];
  },

  /**
   * Форматирование валюты
   */
  formatCurrency: (amount: number): string => {
    const { symbol, precision } = APP_CONFIG.business.currency;
    return `${symbol}${amount.toFixed(precision)}`;
  },
};

// Валидация конфигурации в development режиме
if (isDevelopment) {
  const requiredEnvVars = ['REACT_APP_API_URL'];
  const missingVars = requiredEnvVars.filter(varName => !getEnvVar(varName));
  
  if (missingVars.length > 0) {
    console.warn('⚠️ Отсутствуют обязательные переменные окружения:', missingVars);
  }
  
  console.log('🔧 Конфигурация приложения загружена:', {
    environment: APP_CONFIG.app.environment,
    apiUrl: APP_CONFIG.api.baseUrl,
    features: APP_CONFIG.features,
  });
} 