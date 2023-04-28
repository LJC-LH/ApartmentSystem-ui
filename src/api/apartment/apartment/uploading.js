import request from '@/utils/request'

export function uploadStuImages(data) {
    return request({
        url: '/apartment/imagesUpload/stuImagesUpload',
        method: 'post',
        data: data
    })
}

export function uploadFirstImages(data) {
    return request({
        url: '/apartment/imagesUpload/uploadFirstImages',
        method: 'post',
        data: data
    })
}

export function uploadSecondImages(data) {
    return request({
        url: '/apartment/imagesUpload/uploadSecondImages',
        method: 'post',
        data: data
    })
}