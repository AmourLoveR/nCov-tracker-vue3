import service from '../utils/axios'

export function getObservations(params = {}) {
	return service.request({
		method: 'get',
		url: 'management/observation',
		params,
	})
}

export function getObservationById(id) {
	return service.request({
		method: 'get',
		url: `management/observation/${id}`,
	})
}

export function insertObservation(data) {
	return service.request({
		method: 'post',
		url: 'management/observation',
		data,
	})
}

export function uptObservation(data) {
	return service.request({
		method: 'put',
		url: 'management/observation',
		data,
	})
}

export function getObservationTree(id, direction = 'all') {
	return service.request({
		method: 'get',
		url: `management/observation/tree/${id}/${direction}`,
	})
}

export function insertPcrRecord(data) {
	return service.request({
		method: 'post',
		url: 'management/pcr/',
		data,
	})
}

export function getFaker(patientId) {
	return service.request({
		method: 'get',
		url: `management/faker/${patientId}`,
	})
}

export function getLocations(params = {}) {
	return service.request({
		method: 'get',
		url: 'management/location/',
		params,
	})
}

export function insertLocation(data) {
	return service.request({
		method: 'post',
		url: 'management/location/',
		data,
	})
}

export function deleteLocation(id) {
	return service.request({
		method: 'delete',
		url: `management/location/${id}`,
	})
}
