'use strict';

const { NodeSDK } = require('@opentelemetry/sdk-node');

const { Resource } = require('@opentelemetry/resources');
const {
    SEMRESATTRS_SERVICE_NAME,
    SEMRESATTRS_SERVICE_NAMESPACE,
    SEMRESATTRS_SERVICE_VERSION,
    SEMRESATTRS_SERVICE_INSTANCE_ID
} = require('@opentelemetry/semantic-conventions');

const {
    LoggerProvider,
    BatchLogRecordProcessor,
} = require('@opentelemetry/sdk-logs');

const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');
const { OTLPLogExporter } = require('@opentelemetry/exporter-logs-otlp-http');

const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

// Define the service name and other resource attributes
const resource = new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'backstage-application',
    [SEMRESATTRS_SERVICE_NAMESPACE]: 'org',
    [SEMRESATTRS_SERVICE_VERSION]: '1.0.0',
    [SEMRESATTRS_SERVICE_INSTANCE_ID]: 'backstage-application-1',
});

// Collector endpoint
const COLLECTOR_URL = 'http://monitoring-platform-otel-collector:4318'; // Base URL for the collector

const traceExporter = new OTLPTraceExporter({
    url: `${COLLECTOR_URL}/v1/traces`,
});

const metricExporter = new OTLPMetricExporter({
    url: `${COLLECTOR_URL}/v1/metrics`,
});

const logExporter = new OTLPLogExporter({
    url: `${COLLECTOR_URL}/v1/logs`,
});
const loggerProvider = new LoggerProvider();
const logRecordProcessor = new BatchLogRecordProcessor(logExporter);
loggerProvider.addLogRecordProcessor(logRecordProcessor);

const sdk = new NodeSDK({
    resource,
    traceExporter,
    metricExporter,
    logRecordProcessor: logRecordProcessor,
    instrumentations: [
        getNodeAutoInstrumentations(),
    ],
});

sdk.start();
