import { NextFunction, Response } from "express";
import { ApiResponse } from "../types";
import ApiError from "../utils/ApiError";


/**
 * Middleware to standardize API responses.
 * 
 * This middleware handles the creation of a consistent API response structure, whether the request was successful or encountered an error. It constructs an `ApiResponse` object that includes metadata about the request, such as the URL, method, client IP, and timestamp.
 *
 * @template T - The type of data that will be included in the response if the request is successful.
 * 
 * @param error - Any error encountered during the request handling.
 * @param req - The incoming request object, which may include custom properties.
 * @param res - The outgoing response object used to send the standardized API response.
 * @param next - The next middleware function in the stack, typically not called here as this middleware finalizes the response.
 * 
 * @returns A JSON response with a structured `ApiResponse` object containing the success status, HTTP status code, message, data or error details, and request metadata.
 */
const response = <T>(
    error: ApiError,
    req: any,
    res: Response,
    next: NextFunction
) => {
    const status = error.stack ? (error.status || 500) : (req.responseStatus || 200);
    const apiResponse: ApiResponse<T> = {
        success: !error.stack,
        status: status,
        message: req.message || (error.stack ? "Request failed" : "Request successfull"),
        data: req.responseData as T,
        error: error ? error.message : undefined,
        _metadata: {
            _url: req.originalUrl,
            _method: req.method,
            _ip: req.ip,
            _device: (req as any).device,
            _timestamp: new Date().toUTCString(),
        }
    };

    res.status(status).json(apiResponse);
};

export default response;
