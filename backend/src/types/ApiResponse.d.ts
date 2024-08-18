interface ApiResponse<T> {
    success: boolean;
    status: number;
    message: string;
    data?: T;
    error?: string;
    _metadata: {
        _url: string;
        _method: string;
        _ip: string;
        _device?: string;
        _timestamp: string;
    };
}

export default ApiResponse;