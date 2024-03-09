const config = {
    user: 'theo',
    password: 'dodo',
    server: 'DESKTOP-3GHFNTN',
    database: 'NBADB',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS',
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        }
    },
    port: 1434
}

module.exports = config;