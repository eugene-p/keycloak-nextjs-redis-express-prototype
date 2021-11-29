export default {
    'realm': 'yp-proto',
    'bearer-only': true,
    'auth-server-url': 'http://localhost:8080/auth/',
    'ssl-required': 'none',
    'resource': 'proto-api',
    'verify-token-audience': true,
    'use-resource-role-mappings': true,
    'confidential-port': 0,
    'credentials': {
      'secret': 'c5024607-f16f-4745-b56a-eccbedef8e20'
    },
    // 'realm-public-key': ''
  }