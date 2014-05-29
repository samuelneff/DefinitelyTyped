// Type definitions for mysql
// Project: https://github.com/felixge/node-mysql
// Definitions by: Samuel Neff <https://github.com/samuelneff/>
// Definitions: https://github.com/samuelneff/DefinitelyTyped

/// <reference path="../node/node.d.ts" />

declare module "mysql" {

    import stream = require("stream");

    /**
     * Creates a new connection to the specified database based on supplied parameters.
     * @param config Database connection options.
     */
    export function createConnection(config:ConnectionConfig):Connection;

    /**
     * Creates a new connection pool that allows efficient reuse of connections.
     *
     * @param config Database connection options
     */
    export function createPool(config:PooledConnectionConfig):ConnectionPool;

    /**
     *  Creates a new connection pool cluster that provides multiple hosts connection. (group & retry & selector)
     *
     *  @param config The configuration for the connection pool to add to cluster.
     */
    export function createPoolCluster(config:PoolClusterConfig):ConnectionPoolCluster;

    /**
     * Create a query based on existing query so just return existing query.
     *
     * @param query The query to return.
     * @param values ignored
     * @param callback ignored
     */
    export function createQuery(query:Query, values?:any, callback?:(err:MysqlError, results:any, fields:any) => void):Query;

    /**
     * Create a query based on the options provided.
     *
     * @param options Object with query options for the query.
     * @param values Optional values for parameterized sql if not already specified in options.
     * @param callback Callback when query is executed, with error parameter if an error occurred.
     */
    export function createQuery(options:QueryOptions, values:any, callback:(err:MysqlError, results:any, fields:any) => void):Query;

    /**
     * Create a query from the parameterized sql and values provided.
     *
     * @param sql SQL string, optionally with parameters, for the query.
     * @param values Optional values for parameterized sql if not already specified in options.
     * @param callback Callback when query is executed, with error parameter if an error occurred.
     */
    export function createQuery(sql:string, values:any, callback:(err:MysqlError, results:any, fields:any) => void):Query;

    /**
     *
     */
    export var Types:DataTypes;


    /**
     * Safely escapes a value so that it can be added to a sql query.  Important for preventing sql
     * injection, but using placeholders is even better.
     *
     * @param sqlParameter Text to escape.
     */
    export function escape(sqlParameter:string):string;

    /**
     * Escapes a SQL identifier (database / table / column name).  Important when identifiers are
     * provided by user input.  Different from connection.escape() since mysql.escapeId() wraps
     * identifiers in tick marks (`date`) that denote an identifier.
     *
     * @param identifier Name of potentially invalid (if not escape) identifier to escape.
     */
    export function escapeId(identifier:string):string;

    /**
     * Prepares a SQL query by properly escaping all supplied parameter values and inserting them
     * in the appropriate locations within the specified SQL identified by ordered placeholders.
     *
     * @param sql SQL to format, containing placeholders '?' and/or '??'
     * @param values Array of values to populate placeholders.  The length of the array should match the number of
     * placeholders.
     */
    export function format(sql:string, values:any):string;

    export interface Connection {

        /**
         * Opens the connection.
         *
         * @param callback Optional callback function that indicates connection is establishes and provides error info if
         * error occured.
         */
        connect(callback?:(err:MysqlError) => void):void;

        /**
         * Checks whether the connection to the server is working.
         *
         * @param callback Function executed when ping succeeds or error occurs.  MysqlError supplied if an error occurs.
         */
        ping(callback:(err:MysqlError) => void):void;

        /**
         * Gets a string of internal statistics.
         *
         * @param callback Function executed when ping succeeds or error occurs.  MysqlError supplied if an error occurs.
         *
         * @remarks I think there is a bug in the mysql implementation that means the stats will
         * never actually be available.  The statistics(callback) method does not return anything.
         * I think it's supposed to return the statistics object which, upon completion, is
         * populated with dynamic statistics that are returned by the server.  It looks like the
         * server response is handled properly and the stats object is created and populated, only
         * it's never returned and thus not accessible to the caller.
         */
        statistics(callback:(err:MysqlError) => void):void;

        /**
         * Halts all messages being sent to or received from the connection.
         */
        pause():void;

        /**
         * Resumes sending and receiving messages to and from the connection (after paused).
         */
        resume():void;

        /**
         * Gracefully closes a connection, optionally accepting a callback which receives an error parameter.
         *
         * @param callback Function executed when end succeeds or error occurs.
         */
        end(callback?:(err:MysqlError) => void):void;

        /**
         * Forcefully terminates a connection by closing the underlying socket.
         */
        destroy():void;

        /**
         * Releases a pooled connection back to the connection pool.
         */
        release():void;

        /**
         * Starts a transaction and returns the query used to start the transaction.
         *
         * @param callback Function called when transaction is started or error occurs.
         */
        beginTransaction(callback?:(err:MysqlError, results:any, fields:any) => void):Query;

        /**
         * Commits a transaction and returns the query used to commit the transaction.
         *
         * @param callback Function called when transaction is committed or error occurs.
         */
        commit(callback?:(err:MysqlError, results:any, fields:any) => void):Query;

        /**
         * Rolls back a transaction and returns the query used to rollback the transaction.
         *
         * @param callback Function called when transaction is rolled back or error occurs.
         */
        rollback(callback?:(err:MysqlError, results:any, fields:any) => void):Query;

        /**
         * Create a query based on existing query so just return existing query.
         *
         * @param query The query to return.
         * @param values ignored
         * @param callback ignored
         */
        createQuery(query:Query, values?:any, callback?:(err:MysqlError, results:any, fields:any) => void):Query;

        /**
         * Create a query based on the options provided.
         *
         * @param options Object with query options for the query.
         * @param values Optional values for parameterized sql if not already specified in options.
         * @param callback Callback when query is executed, with error parameter if an error occurred.
         */
        createQuery(options:QueryOptions, values?:any, callback?:(err:MysqlError, results:any, fields:any) => void):Query;

        /**
         * Create a query from the parameterized sql and values provided.
         *
         * @param sql SQL string, optionally with parameters, for the query.
         * @param values Optional values for parameterized sql if not already specified in options.
         * @param callback Callback when query is executed, with error parameter if an error occurred.
         */
        createQuery(sql:string, values?:any, callback?:(err:MysqlError, results:any, fields:any) => void):Query;

        /**
         * Executes the supplied query.
         *
         * @param query The query to execute.
         * @param values ignored
         * @param callback ignored
         */
        query(query:Query, values?:any, callback?:(err:MysqlError, results:any, fields:any) => void):Query;
        query(query:Query, values?:any, callback?:(err:MysqlError, results:any) => void):Query;
        query(query:Query, values?:any, callback?:(err:MysqlError) => void):Query;

        /**
         * Executes a query with the supplied options on the connection.
         *
         * @param options Object with query options for the query.
         * @param values Optional values for parameterized sql if not already specified in options.
         * @param callback Callback when query is executed, with error parameter if an error occurred.
         */
        query(options:QueryOptions, values?:any, callback?:(err:MysqlError, results:any, fields:any) => void):Query;
        query(options:QueryOptions, values?:any, callback?:(err:MysqlError, results:any) => void):Query;
        query(options:QueryOptions, values?:any, callback?:(err:MysqlError) => void):Query;

        /**
         * Executes a query with the supplied options on the connection.
         *
         * @param options Object with query options for the query.
         * @param callback Callback when query is executed, with error parameter if an error occurred.
         */
        query(options:QueryOptions, callback:(err:MysqlError, results:any, fields:any) => void):Query;
        query(options:QueryOptions, callback:(err:MysqlError, results:any) => void):Query;
        query(options:QueryOptions, callback:(err:MysqlError) => void):Query;

        /**
         * Executes a query with the supplied SQL string and optional parameter values.
         *
         * @param sql SQL string, optionally with parameters, for the query.
         * @param values Optional values for parameterized sql if not already specified in options.
         * @param callback Callback when query is executed, with error parameter if an error occurred.
         */
        query(sql:string, values?:any, callback?:(err:MysqlError, results:any, fields:any) => void):Query;
        query(sql:string, values?:any, callback?:(err:MysqlError, results:any) => void):Query;
        query(sql:string, values?:any, callback?:(err:MysqlError) => void):Query;

        /**
         * Executes a query with the supplied SQL string.
         *
         * @param sql SQL string, optionally with parameters, for the query.
         * @param callback Callback when query is executed, with error parameter if an error occurred.
         */
        query(sql:string, callback:(err:MysqlError, results:any, fields:any) => void):Query;
        query(sql:string, callback:(err:MysqlError, results:any) => void):Query;
        query(sql:string, callback:(err:MysqlError) => void):Query;

        /**
         * Registers an event handler for the 'error' event.
         *
         * @param event Event to handle, "error"
         * @param handler MysqlError handler function.
         */
        on(event:"error", handler:(err:MysqlError) => void):void;

        /**
         * Registers an event handler for the 'drain' event.
         *
         * @param event Event to handle, "drain"
         * @param handler Event handler function.
         */
        on(event:"drain", handler:() => void):void;

        /**
         * Registers an event handler for the 'end' event.
         *
         * @param event Event to handle, "end"
         * @param handler Event handler function.
         */
        on(event:"end", handler:(err:MysqlError) => void):void;
        on(event:string, handler:(err?:MysqlError) => void):void;

        /**
         * Safely escapes a value so that it can be added to a sql query.  Important for preventing sql
         * injection, but using placeholders is even better.
         *
         * @param sqlParameter Text to escape.
         */
        escape(sqlParameter:string):string;

        /**
         * Prepares a SQL query by properly escaping all supplied parameter values and inserting them
         * in the appropriate locations within the specified SQL identified by ordered placeholders.
         *
         * @param sql SQL to format, containing placeholders '?' and/or '??'
         * @param values Array of values to populate placeholders.  The length of the array should match the number of
         * placeholders.
         */
        format(sql:string, values:any):string;

        /**
         * Allows you to alter the current user and other aspects of the connection without shutting down the underlying socket.
         *
         * @param options Specifies options for the new user to assume.
         * @param callback Confirms change was successful or provides error information.
         */
        changeUser(options:ChangeUserOptions, callback:(err:MysqlError) => void):void;

        /**
         * Configuration used to create the connection.
         */
            config: ConnectionConfig;

        /**
         * The current state of the connection: authenticated, connected, disconnected, protocol_error.
         *
         */
            state:string;
    }

    export interface ConnectionPool {

        /**
         * Gets a connection from the connection pool.
         * @param callback Callback function that is called with the error or pooled connection.
         */
        getConnection(callback?:(err:MysqlError, connection:Connection) => void):void;

        /**
         * Closes a connection pool including all connections.
         *
         * @param callback Callback function called when connections are closed.
         * @returns Return value from callback is returned from end(callback) call.
         */
        end(callback?:(err:MysqlError) => any):any;


        /**
         * Opens a connection, executes the supplied query, then releases the connection back to the pool.
         *
         * @param query The query to execute.
         * @param values ignored
         * @param callback ignored
         */
        query(query:Query, values?:any, callback?:(err:MysqlError, results:any, fields:any) => void):Query;

        /**
         * Opens a connection, executes the supplied query, then releases the connection back to the pool.
         *
         * @param options Object with query options for the query.
         * @param values Optional values for parameterized sql if not already specified in options.
         * @param callback Callback when query is executed, with error parameter if an error occurred.
         */
        query(options:QueryOptions, values?:any, callback?:(err:MysqlError, results:any, fields:any) => void):Query;

        /**
         * Opens a connection, executes the supplied query, then releases the connection back to the pool.
         *
         * @param sql SQL string, optionally with parameters, for the query.
         * @param values Optional values for parameterized sql if not already specified in options.
         * @param callback Callback when query is executed, with error parameter if an error occurred.
         */
        query(sql:string, values?:any, callback?:(err:MysqlError, results:any, fields:any) => void):Query;

        /**
         * Safely escapes a value so that it can be added to a sql query.  Important for preventing sql
         * injection, but using placeholders is even better.
         *
         * @param sqlParameter Text to escape.
         */
        escape(sqlParameter:string):string;

        /**
         * Registers an event handler for when a connection is created from the pool.  Allows custom
         * initialization code to be run on the connection prior to it being used by calling code.
         *
         * @param event The name of the event to handle, "connection"
         * @param handler  The function handler which accepts a single parameter of tpye Connection.
         */
        on(event:"connection", handler:(connection:Connection) => void):void;
        on(event:string, handler:(connection:Connection) => void):void;
    }

    export interface ConnectionPoolCluster {

        /**
         * Add an anonymous connection configuration to the pool cluster.
         * @param config Connection configuration options
         */
        add(config:PoolClusterConfig):void;

        /**
         * Add a named connection configuration to the pool cluster.
         * @param clusterName Name of the connection pool cluster
         * @param config Connection pool cluster configuration
         */
        add(clusterName:string, config:PoolClusterConfig):void;

        /**
         * Closes all connection pools in the cluster, including all connections in each pool.
         */
        end():void;

        /**
         * Gets a connection from the any connection pool in the cluster.
         *
         * @param pattern Cluster name or name pattern to match, possibly including a wildcard (*).
         * @param selector Selection method to use: RR (Round-Robin), RANDOM, or ORDER.
         * @param callback Callback function that is called with the error or pooled connection.
         */
        getConnection(pattern?:string, selector?:string, callback?:(err:MysqlError, connection:Connection) => void):void;

        /**
         * Gets a connection from the any connection pool in the cluster.
         *
         * @param pattern Cluster name or name pattern to match, possibly including a wildcard (*).
         * @param callback Callback function that is called with the error or pooled connection.
         */
        getConnection(pattern:string, callback:(err:MysqlError, connection:Connection) => void):void;

        /**
         * Gets a connection from the any connection pool in the cluster.
         *
         * @param callback Callback function that is called with the error or pooled connection.
         */
        getConnection(callback:(err:MysqlError, connection:Connection) => void):void;

        /**
         * Returns one connection pool from the cluster matching the specified pattern and optional selector.
         * @param pattern Cluster name pattern to match, usually including a wildcard (*).
         * @param selector Selection method to use: RR (Round-Robin), RANDOM, or ORDER.
         */
        of(pattern:string, selector?:string): ConnectionPoolNamespace;

        /**
         * Adds an event handler for when a pool is removed from the cluster following an error.
         * @param event Event to handle, "remove"
         * @param handler Handler which receives the cluster name that was removed
         */
        on(event:"remove", handler:(clusterName:string) => void):void;
        on(event:string, handler:(p?:any) => void):void;
    }

    export interface ConnectionPoolNamespace {
        /**
         * Gets a connection from the selected connection pool in the cluster.
         *
         * @param callback Callback function that is called with the error or pooled connection.
         */
        getConnection(callback:(err:MysqlError, connection:Connection) => void):void;
    }

    export interface Query {

        /**
         * Registers an error handler for the query.
         * @param event Name of the event to handle, "MysqlError"
         * @param handler Function that handles the event, accepting a single error parameter.
         */
        on(event:"error", handler:(err:MysqlError) => void):Query;

        /**
         * Registers a fields handler for the query. Called when the result fields are available.
         *
         * @param event Name of the event to handle, "fields"
         * @param handler Function that handles the event, accepting a single fields parameter.
         */
        on(event:"fields", handler:(fields:any, index:number) => void):Query;
        on(event:"fields", handler:(fields:any) => void):Query;

        /**
         * Registers a result (rows) handler for the query. Called for each reslut row.
         *
         * @param event Name of the event to handle, "result"
         * @param handler Function that handles the event, accepting a single row parameter.
         */
        on(event:"result", handler:(row:any, index?:number) => void):Query;
        on(event:"result", handler:(row:any) => void):Query;

        /**
         * Registers an end handler for the query.
         *
         * @param event Name of the event to handle, "end"
         * @param handler Function that handles the event.
         *
         */
        on(event:"end", handler:() => void):Query;
        on(event:string, handler:(p1:any, p2:any) => void):Query;
        on(event:string, handler:(p1:any) => void):Query;
        on(event:string, handler:() => void):Query;

        /**
         * Provides a row-stream to the caller.
         *
         * @param options Stream options.
         */
        // HACK: Couldn't get it to compile referencing node.d.ts/stream/ReadableOptions
        //stream(options:{highWaterMark?: number; encoding?: string; objectMode?: boolean}):Readable;
        stream(options?:stream.ReadableOptions):stream.Readable;
        /**
         * The sql assigned to the query.  Once query is run, the sql will
         * have placeholders already replaced by values and appropriately
         * escaped.
         */
            sql:string;

        /**
         * Values that are used to populate placeholders in sql.
         */
            values:any;

        /**
         * Determines if column values should be converted to native JavaScript types. (Default: true)
         */
            typeCast: any;

        /**
         * Determines how duplicate field names are handled.  When false, duplicate columns are suppressed.  When
         * set to 'true', results are nested under table names.  When set to a string, the field names are
         * prefixed with field name followed by the nestTables string.
         */
            nestTables: any;
    }

    /**
     * Parameters that can be passed to mysql.createConnection() to establish a connection to the database.
     */
    export interface ConnectionConfig {

        /**
         * The hostname of the database you are connecting to. (Default: localhost)
         */
            host?: string;

        /**
         * The port number to connect to. (Default: 3306)
         */
            port?: number;

        /**
         * The source IP address to use for TCP connection. (Optional)
         */
            localAddress?: string;

        /**
         * The path to a unix domain socket to connect to. When used host and port are ignored.
         */
            socketPath?: string;

        /**
         *  The MySQL user to authenticate as.
         */
            user?: string;

        /**
         * The password of that MySQL user.
         */
            password?: string;

        /**
         * Name of the database to use for this connection (Optional).
         */
            database?: string;

        /**
         * The charset for the connection. (Default: 'UTF8_GENERAL_CI'. Value needs to be all in upper case letters!)
         */
            charset?: string;

        /**
         * The timezone used to store local dates. (Default: 'local')
         */
            timezone?: string;

        /**
         * Stringify objects instead of converting to values. (Default: 'false')
         *
         * @remarks See issue #501.
         */
            stringifyObjects?: string;

        /**
         * Allow connecting to MySQL instances that ask for the old (insecure) authentication method. (Default: false)
         */
            insecureAuth?: boolean;

        /**
         * Determines if column values should be converted to native JavaScript types. (Default: true)
         */
            typeCast?: any;

        /**
         *  A custom query format function. See Custom format.
         */
            queryFormat?:  (query:string, values:any) => string;

        /**
         * When dealing with big numbers (BIGINT and DECIMAL columns) in the database, you should enable this option (Default: false).
         */
            supportBigNumbers?: boolean;

        /**
         * Enabling both supportBigNumbers and bigNumberStrings forces big numbers (BIGINT and DECIMAL columns) to be always returned as JavaScript String objects (Default: false). Enabling supportBigNumbers but leaving bigNumberStrings disabled will return big numbers as String objects only when they cannot be accurately represented with JavaScript Number objects (which happens when they exceed the [-2^53, +2^53] range), otherwise they will be returned as Number objects. This option is ignored if supportBigNumbers is disabled.
         */
            bigNumberStrings?: boolean;

        /**
         * Force date types (TIMESTAMP, DATETIME, DATE) to be returned as strings rather then inflated into JavaScript Date objects. (Default: false)
         */
            dateStrings?: boolean;

        /**
         *  Prints protocol details to stdout.  Can be boolean true/false or array of string names of packets to debug,
         *  i.e., {debug: ['ComQueryPacket', 'RowDataPacket']} (Default: false)
         */
            debug?: any;

        /**
         *   Allow multiple mysql statements per query. Be careful with this, it exposes you to SQL injection attacks. (Default: false)
         */
            multipleStatements?: boolean;

        /**
         *  List of connection flags to use other than the default ones. It is also possible to blacklist default ones.
         *
         *  @remark  If, for any reason, you would like to change the default connection flags, you can use the connection option flags. Pass a string with a comma separated list of items to add to the default flags. If you don't want a default flag to be used prepend the flag with a minus sign. To add a flag that is not in the default list, don't prepend it with a plus sign, just write the flag name (case insensitive).

         Please note that some available flags that are not default are still not supported (e.g.: SSL, Compression). Use at your own risk.
         */
            flags?: string;

    }

    export interface PooledConnectionConfig extends ConnectionConfig {

        /**
         * The function to use to create the connection. (Default: mysql.createConnection)
         *
         * @param parameters Connection creation parameters.
         */
            createConnection?: (parameters:ConnectionConfig) => Connection;

        /**
         * Determines the pool's action when no connections are available and the limit has been reached. If true, the pool will queue the connection request and call it when one becomes available. If false, the pool will immediately call back with an error. (Default: true)
         */
            waitForConnections?: boolean;

        /**
         * The maximum number of connections to create at once. (Default: 10)
         */
            connectionLimit?: number;

        /**
         * The maximum number of connection requests the pool will queue before returning an error from getConnection. If set to 0, there is no limit to the number of queued connection requests. (Default: 0)
         */
            queueLimit?: number;
    }

    export interface PoolClusterConfig extends PooledConnectionConfig {

        /**
         * If true, PoolCluster will attempt to reconnect when connection fails. (Default: true)
         */
            canRetry?: boolean;

        /**
         * If connection fails, node's errorCount increases. When errorCount is greater than removeNodeMysqlErrorCount, remove a node in the PoolCluster. (Default: 5)
         */
            removeNodeErrorCount?: number;

        /**
         * The default selector: : RR (Round-Robin), RANDOM, or ORDER. (Default: RR)
         */
            defaultSelector?: string;

    }

    export interface QueryOptions {
        /**
         * The sql to execute.
         */
            sql: string;

        /**
         * Values to replace in placeholders within sql.
         */
            values?: any;

        /**
         * Determines if column values should be converted to native JavaScript types.  Can be boolean or custom function
         * to convert. (Default: true)
         */
            typeCast?: any;

        /**
         * Determines how duplicate field names are handled.  When false, duplicate columns are suppressed.  When
         * set to 'true', results are nested under table names.  When set to a string, the field names are
         * prefixed with field name followed by the nestTables string.
         */
            nestTables?: any;
    }

    export interface ChangeUserOptions {

        /**
         * The name of the new user (defaults to the previous one).
         */
            user?: string;

        /**
         * The password of the new user (defaults to the previous one).
         */
            password?: string;

        /**
         * The new charset (defaults to the previous one).
         */
            charset?: string;

        /**
         * The new database (defaults to the previous one).
         */
            database?: string;

    }

    export interface DataTypes {
        DECIMAL:number;
        TINY:number;
        SHORT:number;
        LONG:number;
        FLOAT:number;
        DOUBLE:number;
        NULL:number;
        TIMESTAMP:number;
        LONGLONG:number;
        INT24:number;
        DATE:number;
        TIME:number;
        DATETIME:number;
        YEAR:number;
        NEWDATE:number;
        VARCHAR:number;
        BIT:number;
        NEWDECIMAL:number;
        ENUM:number;
        SET:number;
        TINY_BLOB:number;
        MEDIUM_BLOB:number;
        LONG_BLOB:number;
        BLOB:number;
        VAR_STRING:number;
        STRING:number;
        GEOMETRY:number;
    }

    export interface MysqlError extends Error {

        /**
         * Either a MySQL server error (e.g. 'ER_ACCESS_DENIED_ERROR'), a node.js error (e.g. 'ECONNREFUSED') or an internal error (e.g. 'PROTOCOL_CONNECTION_LOST')
         *
         * @remarks For list of available codes, http://dev.mysql.com/doc/refman/5.5/en/error-messages-server.html
         *
         */
            code?: string;

        /**
         * MysqlError number provided by MySQL, ex. 1005 for ER_CANT_CREATE_TABLE and 1015 for ER_CANT_LOCK.
         * Provided for a few errors, but not many.
         *
         * @remarks For list of available codes, http://dev.mysql.com/doc/refman/5.5/en/error-messages-server.html
         *
         */
            errno?: number;

        /**
         * Five character SQL State for the error. "00000" means no error.  Provided for some errors but not many.
         *
         * @remarks Documentation available at http://dev.mysql.com/doc/refman/5.0/en/error-handling.html
         *
         */
            sqlState?: string;

        /**
         * Boolean, indicating if this error is terminal to the connection object.
         */
            fatal?: boolean;
    }

}

