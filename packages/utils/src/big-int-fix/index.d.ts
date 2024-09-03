/**
 * Passing a number back from the database to the frontend
 * via JSON.parse will break, as the numbers are stored as
 * bigints. This function converts them so that they can be
 * passed back to the frontend without errors
 */
export declare function bigIntFix<T>(value: T): T;
//# sourceMappingURL=index.d.ts.map