export function sendSuccessResponse(res, message, data) {
	return res.status(200).json({ success: true, message, data })
}

export function sendEmptyResponse(res, message, data) {
	return res.status(200).json({ success: false, message, data })
}

export function sendErrorResponse(res, statusCode, message, error) {
	return res.status(statusCode).json({ succes: false, message, error })
}

